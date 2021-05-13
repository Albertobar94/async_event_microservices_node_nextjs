import mongoose  from "mongoose";
import Password from "../lib/utils/password";

interface UserProps {
  email: string,
  password: string,
}

// to describe the properties the userModel has
interface UserModel extends mongoose.Model<UserDoc> {
  build(user: UserProps): UserDoc;
}

// to describe the properties the userDocument has
interface UserDoc extends mongoose.Document {
  email: string,
  password: string,
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret.password;
        delete ret._id;
      }
    }
  }
);
userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
})
userSchema.statics.build = (user: UserProps) => {
  return new User(user)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


export { User }
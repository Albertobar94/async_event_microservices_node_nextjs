import Router from 'next/router';
import React, { useState } from 'react'
import useRequest from '../../lib/hooks/useRequest';



const signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'POST',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    
    await doRequest();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign in</h1>
      <div>
        <div>
          <label>
            Email Address
            <br/>
            <input 
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <br/>
            <input 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
            />
          </label>
        </div>
        {errors}
        <button type="submit">Sign In</button>
      </div>
    </form>
  )
}

export default signup

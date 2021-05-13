import { GetServerSideProps, NextPageContext } from 'next';
import axios, { AxiosResponse } from 'axios';
import buildClient from './api/build-client';

import styles from '../styles/Home.module.css'

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   let response: AxiosResponse<any>;
//   response = await buildClient(ctx.req).get('/api/users/currentuser')
//   return {
//     props: {
//       currentUser: response.data.currentUser,
//     }, // will be passed to the page component as props
//   }
// }

interface Props {
  currentUser?: {
    id: string;
    email: string;
  }
}

const Home = ({ currentUser }: Props) => {
  return (
    <div className={styles.container}>
      {currentUser
        ? (<h1>Hi {currentUser.email}!</h1>)
        : (<h1>Hi Stranger!</h1>)
      }
    </div>
  )
};

Home.getInitialProps = async (ctx: NextPageContext) => {
  let response: AxiosResponse<any>;
  response = await buildClient(ctx.req!).get('/api/users/currentuser')
  return {
    currentUser: response.data.currentUser,
  }
};

export default Home;
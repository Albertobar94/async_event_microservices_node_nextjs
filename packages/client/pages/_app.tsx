import { AppContext, AppProps } from 'next/app';
import Header from '../components/Header';
import buildClient from './api/build-client';

type Props = {
  currentUser?: {
    id: string;
    email: string;
  };
} & AppProps;

function AppComponent({ Component, pageProps, currentUser }: Props) {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
}

AppComponent.getInitialProps = async (appContext: AppContext) => {
  const { data } = await buildClient(appContext.ctx.req!).get(
    '/api/users/currentuser'
  );

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    ...data,
    // will be passed to the page component as props
  };
};

export default AppComponent;

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createClient, Provider } from 'urql';
import { Layout } from '../components/layout';

const client = createClient({
  url: 'https://still-jawfish-32.hasura.app/v1/graphql',
  fetchOptions: () => {
    return {
      headers: { 'x-hasura-admin-secret': 'dTwfNPybxuNShyMlBLbgNxG5r0tNU3CK6Ylns3W8ja3uKFmnam0ZcWyk9JFLIjm6' },
    };
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return <Provider value={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
}

export default MyApp

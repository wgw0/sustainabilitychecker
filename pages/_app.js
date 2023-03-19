import '../styles/globals.css';
import Layout from '../components/Layout';

//https://nextjs.org/docs/basic-features/layouts

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
     <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

import Layout from '../components/Layout';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  return (
    <ChakraProvider theme={theme}>
      <UserContext.Provider value={userData}>
        <Layout>
          <Component {...pageProps} />
          <Toaster position='bottom-center' reverseOrder={false} />
        </Layout>
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;

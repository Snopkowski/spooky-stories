import { Flex } from '@chakra-ui/react';
import Footer from './Footer';
import Navbar from './Navbar';
export default function Layout({ children }) {
  return (
    <Flex
      direction='column'
      minH='100vh'
      maxW='5xl'
      m='0 auto'
      p={[5, 6, 8, 12]}
      pos='relative'
    >
      <Navbar />
      <Flex direction='column' flexGrow='1' mt={4} py={[0, 1, 2, 4]}>
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
}

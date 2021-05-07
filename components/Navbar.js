import NextLink from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import {
  HStack,
  Avatar,
  Button,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import DarkModeSwitch from './DarkModeSwitch';
export default function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <Flex
      pos='sticky'
      top='0'
      zIndex='1000'
      justifyContent='space-between'
      mb={8}
      py={4}
      alignContent='center'
      as='nav'
      bg={useColorModeValue('bgLight', 'bgDark')}
    >
      <NextLink href='/'>
        <Button>Spooky Stories</Button>
      </NextLink>

      {/* user is signed-in and has username */}
      <HStack spacing={2}>
        <DarkModeSwitch />
        {username && (
          <>
            <NextLink href='/admin'>
              <Button>Write Posts</Button>
            </NextLink>

            <NextLink href={`/${username}`}>
              <Avatar cursor='pointer' h='40px' w='40px' src={user?.photoURL} />
            </NextLink>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <NextLink href='/enter'>
            <Button>Log in</Button>
          </NextLink>
        )}
      </HStack>
    </Flex>
  );
}

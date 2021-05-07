import { Flex, Stack, Avatar, Text, Heading } from '@chakra-ui/react';

import { SignOutButton } from '../pages/enter';
export default function UserProfile({ user }) {
  return (
    <Stack spacing={4} py={4} direction='column' alignItems='center'>
      <Avatar size='xl' src={user.photoURL} />
      <Text>
        <i>@{user.username}</i>
      </Text>
      <Heading as='h1'>{user.displayName}</Heading>
      <SignOutButton />
    </Stack>
  );
}

import NextLink from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

export default function AuthCheck(props) {
  const { username } = useContext(UserContext);

  return username
    ? props.children
    : props.fallback || (
        <NextLink href='/enter'>You must be signed in</NextLink>
      );
}

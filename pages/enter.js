import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { UserContext } from '../lib/context';
import {
  Button,
  Box,
  Flex,
  Avatar,
  SimpleGrid,
  Heading,
  Center,
} from '@chakra-ui/react';

import { useEffect, useState, useCallback, useContext } from 'react';
import debounce from 'lodash.debounce';
import { Router, useRouter } from 'next/router';

export default function Enter(props) {
  const { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <Flex as='main'>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </Flex>
  );
}

// Sign in with Google button
function SignInButton() {
  const router = useRouter();
  const signInWithGoogle = async () => {
    await (auth.signInWithPopup(googleAuthProvider) && router.push('/'));
  };

  return (
    <SimpleGrid w='100%' columns={2} minChildWidth={300}>
      <Center>
        <Button onClick={signInWithGoogle}>
          <Avatar mr={4} size='xs' src={'./vercel.png'} /> Sign in with Google
        </Button>
      </Center>
      <Center>Make your own account to share your story.</Center>
    </SimpleGrid>
  );
}

// Sign out button
export function SignOutButton() {
  const router = useRouter();
  return (
    <Button onClick={() => auth.signOut() && router.push('/')}>Sign Out</Button>
  );
}

// Username form
function UsernameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    const batch = firestore.batch();
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const onChange = (e) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log('Firestore read executed!');
        setIsValid(!exists);
        setLoading(false);
      }
    }, 1000),
    []
  );

  return (
    !username && (
      <section>
        <Heading as='h3'>Choose Username</Heading>
        <form onSubmit={onSubmit}>
          <input
            name='username'
            placeholder='myname'
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <Button type='submit' disabled={!isValid}>
            Choose
          </Button>

          <Heading as='h3'>Debug State</Heading>
          <Box>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </Box>
        </form>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <Text>Checking...</Text>;
  } else if (isValid) {
    return <Text>{username} is available!</Text>;
  } else if (username && !isValid) {
    return <Text>That username is taken!</Text>;
  } else {
    return <p>Soething else</p>;
  }
}

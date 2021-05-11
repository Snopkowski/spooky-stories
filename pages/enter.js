import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { UserContext } from '../lib/context';
import {
  Button,
  Flex,
  Avatar,
  SimpleGrid,
  Heading,
  Center,
  Text,
  Stack,
  Input,
} from '@chakra-ui/react';

import { useEffect, useState, useCallback, useContext } from 'react';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import UserProfile from '../components/UserProfile';

export default function Enter(props) {
  const { user, username } = useContext(UserContext);

  return (
    <Flex as='main' justifyContent='center'>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <UserProfile user={user} />
        )
      ) : (
        <SignInButton />
      )}
    </Flex>
  );
}

// Sign in with Google button
function SignInButton() {
  // auth providers..
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <SimpleGrid w='100%' columns={2} minChildWidth={300}>
      <Center py='8'>
        <Button onClick={signInWithGoogle}>
          <Avatar mr={4} size='xs' src={'./vercel.png'} /> Sign in with Google
        </Button>
      </Center>
      <Center py='8'>Make your own account to share your story.</Center>
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
  const router = useRouter();
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
        setIsValid(!exists);
        setLoading(false);
      }
    }, 1000),
    []
  );

  return (
    !username && (
      <Stack spacing={8} as='section'>
        <Heading as='h1'>Choose your Username</Heading>
        <form onSubmit={onSubmit}>
          <Input
            name='username'
            placeholder='Username'
            value={formValue}
            onChange={onChange}
            py={4}
          />
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <Button
            py={4}
            type='submit'
            onClickCapture={() => router.push('/')}
            disabled={!isValid}
          >
            Choose
          </Button>
          <Stack spacing={8}>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </Stack>
        </form>
      </Stack>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <Text py={4}>Checking...</Text>;
  } else if (isValid) {
    return (
      <Text py={4}>
        <b>{username}</b> is available!
      </Text>
    );
  } else if (username && !isValid) {
    return <Text py={4}>That username is taken!</Text>;
  } else {
    return <Text py={4}>Username will be displayed publicly.</Text>;
  }
}

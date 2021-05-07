import AuthCheck from '../../components/AuthCheck';
import PostFeed from '../../components/PostFeed';
import { UserContext } from '../../lib/context';
import { firestore, auth, serverTimestamp } from '../../lib/firebase';

import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { useCollection } from 'react-firebase-hooks/firestore';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';

import { Heading, Box, Button, Stack, Text, Input } from '@chakra-ui/react';
export default function AdminPostsPage(props) {
  return (
    <Box as='main'>
      <AuthCheck>
        <CreateNewPost />
        <PostList />
      </AuthCheck>
    </Box>
  );
}

function PostList() {
  const ref = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('posts');
  const query = ref.orderBy('createdAt');
  const [querySnapshot] = useCollection(query);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <Heading as='h1'>Manage your Posts</Heading>
      <PostFeed posts={posts} admin />
    </>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');

  const slug = encodeURI(kebabCase(title));

  const isValid = title.length > 3 && title.length < 100;

  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection('users')
      .doc(uid)
      .collection('posts')
      .doc(slug);

    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: 'Your story',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await ref.set(data);

    toast.success('Post created!');

    router.push(`/admin/${slug}`);
  };

  return (
    <Stack my={8} spacing={4} as='form' onSubmit={createPost}>
      <Heading>Title: {title}</Heading>
      <Text>Slug: {slug}</Text>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='My story!'
      />
      <Button type='submit' disabled={!isValid}>
        Create New Story
      </Button>
    </Stack>
  );
}

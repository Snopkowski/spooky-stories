import AuthCheck from '../../components/AuthCheck';
import { firestore, auth, serverTimestamp } from '../../lib/firebase';

import { useState } from 'react';
import { useRouter } from 'next/router';

import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  Text,
  Textarea,
  Heading,
  Box,
  Button,
  Grid,
  Stack,
  GridItem,
  Checkbox,
} from '@chakra-ui/react';
export default function AdminPostEdit(props) {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
}

function PostManager() {
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  const postRef = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('posts')
    .doc(slug);
  const [post] = useDocumentData(postRef);

  return (
    <Grid templateColumns='repeat(5, 1fr)' gap={4}>
      {post && (
        <>
          <GridItem as='main' colSpan={4}>
            <Heading as='h1'>{post.title}</Heading>
            <Text>ID: {post.slug}</Text>

            <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </GridItem>

          <GridItem
            as='aside'
            display='flex'
            flexDirection={{ base: 'row', md: 'column' }}
            colSpan={1}
          >
            <Stack spacing={4}>
              <Heading fontWeight='semibold' as='h3'>
                Tools
              </Heading>
              <Button onClick={() => setPreview(!preview)}>
                {preview ? 'Edit' : 'Preview'}
              </Button>
              <Link href={`/${post.username}/${post.slug}`}>
                <Button>Live view</Button>
              </Link>
            </Stack>
          </GridItem>
        </>
      )}
    </Grid>
  );
}

function PostForm({ defaultValues, postRef, preview }) {
  const { register, handleSubmit, reset, watch, formState, errors } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const { isValid, isDirty } = formState;

  const updatePost = async ({ content, published }) => {
    await postRef.update({
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });

    toast.success('Post updated successfully!');
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <Stack spacing={8}>
          <ReactMarkdown>{watch('content')}</ReactMarkdown>
        </Stack>
      )}

      <Stack
        spacing={8}
        display={preview ? 'none' : 'flex'}
        flexDirection='column'
      >
        <Textarea
          minH='50vh'
          name='content'
          ref={register({
            maxLength: { value: 20000, message: 'content is too long' },
            minLength: { value: 10, message: 'content is too short' },
            required: { value: true, message: 'content is required' },
          })}
        />
        {errors.content && <Text>{errors.content.message}</Text>}
        <Checkbox name='published' type='checkbox' ref={register}>
          Published
        </Checkbox>

        <Button type='submit' disabled={!isDirty || !isValid}>
          Save Changes
        </Button>
      </Stack>
    </form>
  );
}

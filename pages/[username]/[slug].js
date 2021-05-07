import PostContent from '../../components/PostContent';
import GhostButton from '../../components/GhostButton';
import AuthCheck from '../../components/AuthCheck';
import Metatags from '../../components/Metatags';
import { UserContext } from '../../lib/context';
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';

import NextLink from 'next/link';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useContext } from 'react';

import { Grid, Stack, Button, Text, GridItem } from '@chakra-ui/react';

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug);
    post = postToJSON(await postRef.get());

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 100,
  };
}

export async function getStaticPaths() {
  const snapshot = await firestore.collectionGroup('posts').get();

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

export default function Post(props) {
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;

  const { user: currentUser } = useContext(UserContext);

  return (
    <>
      <Metatags title={post.title} description={post.title} />
      <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
        <GridItem colSpan={3} as='main'>
          <PostContent post={post} />
        </GridItem>
        <GridItem as='aside' colSpan={1}>
          <Stack spacing={3}>
            <Text fontWeight='bold'>
              Spook-o-meter &#128123; {post.heartCount || 0}
            </Text>
            <AuthCheck
              fallback={
                <NextLink href='/enter'>
                  <Button>Sign Up</Button>
                </NextLink>
              }
            >
              <GhostButton postRef={postRef} />
            </AuthCheck>
            {currentUser?.uid === post.uid && (
              <NextLink href={`/admin/${post.slug}`}>
                <Button>Edit Post</Button>
              </NextLink>
            )}
          </Stack>
        </GridItem>
      </Grid>
    </>
  );
}

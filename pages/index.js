import PostFeed from '../components/PostFeed';
import Loader from '../components/Loader';
import { firestore, fromMillis, postToJSON } from '../lib/firebase';
import { Button, Grid, Text, Box, GridItem, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import HighestRatedPosts from '../components/HighestRatedPosts';

const LIMIT = 2;

export async function getStaticProps(context) {
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  const highestRatedPostsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('heartCount', 'desc')
    .limit(5);

  const highestRatedPosts = (await highestRatedPostsQuery.get()).docs.map(
    postToJSON
  );

  return {
    props: { posts, highestRatedPosts },
    revalidate: 60,
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === 'number'
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);
    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4}>
      <GridItem colSpan={3} as='main'>
        <Heading py={4} fontSize='5xl' as='h1'>
          Spooky Stories
        </Heading>
        <Text>List of recently submitted stories</Text>
        <PostFeed posts={posts} />
        {!loading && !postsEnd && (
          <Button variant='outline' onClick={getMorePosts}>
            Load more
          </Button>
        )}
        <Loader show={loading} />
        {postsEnd && (
          <Text>
            There's nothing more to choose from, go ahead and submit your own!
          </Text>
        )}
      </GridItem>
      <GridItem colSpan={1}>
        <HighestRatedPosts highestRatedPosts={props.highestRatedPosts} />
      </GridItem>
    </Grid>
  );
}

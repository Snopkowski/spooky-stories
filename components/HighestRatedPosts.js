import { Button } from '@chakra-ui/button';
import { Box, Text, Link, Flex, Stack, Heading } from '@chakra-ui/layout';

import NextLink from 'next/link';
export default function highestRatedPosts({ highestRatedPosts }) {
  return (
    <Stack spacing={4}>
      <Heading fontWeight='semibold'>Highest Rated</Heading>
      {highestRatedPosts
        ? highestRatedPosts.map((post) => (
            <NextLink
              passHref
              key={post.title}
              href={`/${post.username}/${post.slug}`}
            >
              <Link fontWeight='bold' variant='ghost'>
                &#128123; {post.heartCount} - {post.title}
              </Link>
            </NextLink>
          ))
        : null}
    </Stack>
  );
}

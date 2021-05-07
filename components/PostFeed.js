import NextLink from 'next/link';
import {
  Flex,
  Stack,
  Box,
  Link,
  Heading,
  Text,
  Button,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

export default function PostFeed({ posts, admin }) {
  return posts
    ? posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))
    : null;
}

function PostItem({ post, admin = false }) {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <Stack
      direction='column'
      border='1px'
      borderColor={useColorModeValue('gray.200', 'gray.800')}
      borderRadius='md'
      my={4}
      p={4}
      spacing={2}
    >
      <NextLink passHref href={`/${post.username}`}>
        <Link fontWeight='semibold' fontSize='sm'>
          Written by @{post.username}
        </Link>
      </NextLink>

      <NextLink passHref href={`/${post.username}/${post.slug}`}>
        <Link as='h2' py={4} fontSize='3xl'>
          {post.title}
        </Link>
      </NextLink>

      <Stack spacing={2}>
        <Text fontSize='sm' textAlign='end'>
          {wordCount} words. {minutesToRead} min read
        </Text>
        <Text fontSize='sm' textAlign='end'>
          Spook-o-meter &#128123; {post.heartCount || 0}
        </Text>
      </Stack>

      {/* If admin view, show extra controls for user */}
      {admin && (
        <>
          <NextLink href={`/admin/${post.slug}`}>
            <Heading as='h3'>
              <Button>Edit</Button>
            </Heading>
          </NextLink>

          {post.published ? (
            <Button variant='ghost' leftIcon={<CheckIcon />}>
              Live
            </Button>
          ) : (
            <Text>Unpublished</Text>
          )}
        </>
      )}
    </Stack>
  );
}

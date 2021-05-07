import NextLink from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Flex, Heading, useColorModeValue } from '@chakra-ui/react';
export default function PostContent({ post }) {
  const createdAt =
    typeof post?.createdAt === 'number'
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  return (
    <Flex
      direction='column'
      border='1px'
      borderColor={useColorModeValue('gray.200', 'gray.800')}
      borderRadius='md'
      p={4}
    >
      <Flex py={4} direction='column'>
        <Heading py='2' as='h1'>
          {post?.title}
        </Heading>
        Written by{' '}
        <NextLink href={`/${post.username}/`}>
          <a>@{post.username}</a>
        </NextLink>{' '}
        on {createdAt.toISOString()}
      </Flex>
      <ReactMarkdown style={{ width: '100%' }}>{post?.content}</ReactMarkdown>
    </Flex>
  );
}

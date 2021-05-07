import NextLink from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Flex, Text, Heading, useColorModeValue, Link } from '@chakra-ui/react';
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
        <Text>
          {' '}
          Written by{' '}
          <NextLink passHref href={`/${post.username}/`}>
            <Link>@{post.username}</Link>
          </NextLink>{' '}
          on {new Date(createdAt).toDateString()}
        </Text>
      </Flex>
      <ReactMarkdown style={{ width: '100%' }}>{post?.content}</ReactMarkdown>
    </Flex>
  );
}

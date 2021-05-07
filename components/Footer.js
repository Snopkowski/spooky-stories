import {
  Heading,
  Text,
  Stack,
  Link,
  Divider,
  SimpleGrid,
} from '@chakra-ui/layout';
import NextLink from 'next/link';
export default function Footer() {
  return (
    <>
      <Divider py={4} />
      <SimpleGrid columns='2'>
        <Stack p={4} spacing={2}>
          <NextLink passHref href='/guide'>
            <Link>How it works</Link>
          </NextLink>
        </Stack>
        <Text p={4}>This text is just a placeholder. Have a great day!</Text>
      </SimpleGrid>
    </>
  );
}

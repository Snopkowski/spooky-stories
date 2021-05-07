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
        <Text p={4}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem vel
          veniam a consequuntur ad quasi unde ea quos pariatur minus!
        </Text>
      </SimpleGrid>
    </>
  );
}

import { Link, Heading, Text, Stack, List, ListItem } from '@chakra-ui/react';

export default function Guide() {
  return (
    <Stack spacing={4}>
      <Heading as='h1'>How it works</Heading>
      <List>
        <ListItem>1. Create an account.</ListItem>
        <ListItem>2. Submit your story.</ListItem>
        <ListItem>3. Rate stories of others.</ListItem>
      </List>
      <Heading as='h3'>Formatting a story</Heading>
      <Text>
        To make sure your story is formatted nicely, please get familiar with
        basic markdow syntax, link below &#128071;
      </Text>
      <Link href='https://www.markdownguide.org/cheat-sheet/'>
        Markdown Cheatsheet
      </Link>
    </Stack>
  );
}

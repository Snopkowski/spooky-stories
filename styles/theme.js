import { extendTheme } from '@chakra-ui/react';

const colors = {
  bgLight: 'white',
  bgDark: '#0d1117',
  textDark: '#21262d',
  theme: {
    yellow: '#f8dc68',
    blue: '#2ecbd1',
    dark: '#161a27',
  },
};

const styles = {
  global: (props) => ({
    'html, body': {
      color: props.colorMode === 'dark' ? 'bgLight' : 'bgDark',
      bg: props.colorMode === 'dark' ? 'bgDark' : 'bgLight',
    },
    p: {
      opacity: '70%',
    },
    h1: {
      fontSize: '4xl',
    },
    h2: {
      fontSize: '3xl',
    },
    h3: {
      fontSize: '2xl',
    },
    'ul, li': {
      marginLeft: '4',
    },
  }),
};

const fonts = {
  heading: `Inter-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  body: `Inter-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
};

const customTheme = extendTheme({ colors, styles, fonts });

export default customTheme;

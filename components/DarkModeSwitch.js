import { useColorMode, IconButton } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      onClick={toggleColorMode}
      icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
    />
  );
};
export default DarkModeSwitch;

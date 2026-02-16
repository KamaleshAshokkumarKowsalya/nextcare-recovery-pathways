import { Box, useColorModeValue } from '@chakra-ui/react';
import Navbar from './Navbar';

const AppLayout = ({ children }) => {
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Navbar />
      <Box>{children}</Box>
    </Box>
  );
};

export default AppLayout;

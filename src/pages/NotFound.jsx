import { Center, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Center h="100vh">
      <VStack spacing={4}>
        <Heading size="2xl">404</Heading>
        <Text fontSize="xl">Page Not Found</Text>
        <Button colorScheme="primary" onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </Button>
      </VStack>
    </Center>
  );
};

export default NotFound;

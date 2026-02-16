import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Link,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await login(formData);
    
    if (!result.success) {
      toast({
        title: 'Login failed',
        description: result.error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container maxW="md" py={20}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="xl" mb={2}>Welcome Back</Heading>
          <Text color="gray.600">Sign in to your NextCare account</Text>
        </Box>

        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              type="submit"
              colorScheme="primary"
              width="full"
              isLoading={loading}
              loadingText="Signing in..."
            >
              Sign In
            </Button>
          </VStack>
        </Box>

        <Text textAlign="center">
          Don't have an account?{' '}
          <Link as={RouterLink} to="/register" color="primary.500" fontWeight="medium">
            Sign up
          </Link>
        </Text>
      </VStack>
    </Container>
  );
};

export default Login;

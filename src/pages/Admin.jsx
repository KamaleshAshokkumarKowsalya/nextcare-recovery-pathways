import { useState, useEffect } from 'react';
import { userAPI } from '../services/api';
import {
  Box,
  Container,
  Heading,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useToast,
  Spinner,
  Center,
  Badge,
  IconButton
} from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await userAPI.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      toast({
        title: 'Error loading users',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await userAPI.deleteUser(userId);
      setUsers(users.filter(user => user._id !== userId));
      
      toast({
        title: 'User deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error deleting user',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="primary.500" />
      </Center>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading>User Management</Heading>

        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Risk Score</Th>
                <Th>Onboarding</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user._id}>
                  <Td>
                    {user.profile?.firstName} {user.profile?.lastName}
                  </Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <Badge colorScheme={user.role === 'admin' ? 'purple' : 'blue'}>
                      {user.role}
                    </Badge>
                  </Td>
                  <Td>{user.riskScore || 0}</Td>
                  <Td>
                    <Badge colorScheme={user.onboardingCompleted ? 'green' : 'yellow'}>
                      {user.onboardingCompleted ? 'Completed' : 'Pending'}
                    </Badge>
                  </Td>
                  <Td>
                    <IconButton
                      icon={<FiTrash2 />}
                      colorScheme="red"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteUser(user._id)}
                      aria-label="Delete user"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Container>
  );
};

export default Admin;

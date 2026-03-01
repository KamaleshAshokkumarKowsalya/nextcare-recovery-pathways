import { useState, useEffect } from 'react';
import { userAPI, appointmentAPI } from '../services/api';
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
  IconButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex
} from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, appointmentsRes] = await Promise.all([
        userAPI.getAllUsers(),
        appointmentAPI.getAllAdmin()
      ]);
      setUsers(usersRes.data);
      setAppointments(appointmentsRes.data);
    } catch (error) {
      toast({
        title: 'Error loading data',
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

  const handleDeleteAppointment = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) {
      return;
    }

    try {
      await appointmentAPI.delete(appointmentId);
      setAppointments(appointments.filter(apt => apt._id !== appointmentId));
      
      toast({
        title: 'Appointment deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error deleting appointment',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString();
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
        <Heading>Admin Dashboard</Heading>

        <Tabs variant="enclosed">
          <TabList>
            <Tab>Users ({users.length})</Tab>
            <Tab>Appointments ({appointments.length})</Tab>
          </TabList>

          <TabPanels>
            {/* Users Tab */}
            <TabPanel>
              <Box overflowX="auto">
                <Table variant="simple" size="sm">
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
            </TabPanel>

            {/* Appointments Tab */}
            <TabPanel>
              <Box overflowX="auto">
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Patient</Th>
                      <Th>Email</Th>
                      <Th>Title</Th>
                      <Th>Type</Th>
                      <Th>Date & Time</Th>
                      <Th>Status</Th>
                      <Th>Provider</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {appointments.map((apt) => (
                      <Tr key={apt._id}>
                        <Td>
                          {apt.userId?.profile?.firstName} {apt.userId?.profile?.lastName}
                        </Td>
                        <Td fontSize="sm">{apt.userId?.email}</Td>
                        <Td>{apt.title}</Td>
                        <Td>
                          <Badge colorScheme="cyan" fontSize="xs">
                            {apt.type}
                          </Badge>
                        </Td>
                        <Td fontSize="sm">{formatDateTime(apt.dateTime)}</Td>
                        <Td>
                          <Badge
                            colorScheme={
                              apt.status === 'scheduled'
                                ? 'blue'
                                : apt.status === 'completed'
                                ? 'green'
                                : apt.status === 'cancelled'
                                ? 'red'
                                : 'yellow'
                            }
                          >
                            {apt.status}
                          </Badge>
                        </Td>
                        <Td fontSize="sm">{apt.provider?.name || 'N/A'}</Td>
                        <Td>
                          <IconButton
                            icon={<FiTrash2 />}
                            colorScheme="red"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteAppointment(apt._id)}
                            aria-label="Delete appointment"
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

export default Admin;

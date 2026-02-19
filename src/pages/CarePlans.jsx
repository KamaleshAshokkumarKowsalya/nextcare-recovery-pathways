import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { carePlanAPI } from '../services/api';
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Button,
  useToast,
  Spinner,
  Center,
  Text,
  Badge,
  Card,
  CardBody,
  Progress,
  SimpleGrid
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CarePlans = () => {
  const { user } = useAuth();
  const [carePlans, setCarePlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCarePlans();
  }, []);

  const fetchCarePlans = async () => {
    try {
      const response = await carePlanAPI.getAll();
      setCarePlans(response.data);
    } catch (error) {
      toast({
        title: 'Error loading care plans',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'completed':
        return 'blue';
      case 'on-hold':
        return 'orange';
      case 'cancelled':
        return 'red';
      default:
        return 'gray';
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
        <HStack justify="space-between">
          <Box>
            <Heading size="xl">My Care Plans</Heading>
            <Text color="gray.600" mt={2}>Track your personalized recovery plans</Text>
          </Box>
          <Button colorScheme="primary" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </HStack>

        {carePlans.length === 0 ? (
          <Card>
            <CardBody>
              <Center py={10}>
                <VStack spacing={4}>
                  <Text fontSize="lg" color="gray.500">No care plans yet</Text>
                  <Text fontSize="sm" color="gray.400">
                    Your healthcare provider will create a personalized care plan for you
                  </Text>
                </VStack>
              </Center>
            </CardBody>
          </Card>
        ) : (
          <SimpleGrid columns={{ base: 1 }} spacing={6}>
            {carePlans.map((plan) => (
              <Card key={plan._id} _hover={{ shadow: 'lg' }} transition="all 0.2s">
                <CardBody>
                  <VStack align="stretch" spacing={4}>
                    <HStack justify="space-between" align="start">
                      <Box flex={1}>
                        <Heading size="md">{plan.title}</Heading>
                        <Text color="gray.600" mt={2}>{plan.description}</Text>
                      </Box>
                      <Badge colorScheme={getStatusColor(plan.status)} fontSize="sm">
                        {plan.status}
                      </Badge>
                    </HStack>

                    <Box>
                      <HStack justify="space-between" mb={2}>
                        <Text fontWeight="semibold" fontSize="sm">Progress</Text>
                        <Text fontWeight="bold">{plan.progress || 0}%</Text>
                      </HStack>
                      <Progress
                        value={plan.progress || 0}
                        colorScheme="green"
                        borderRadius="full"
                        size="sm"
                      />
                    </Box>

                    {plan.goals && plan.goals.length > 0 && (
                      <Box>
                        <Text fontWeight="semibold" fontSize="sm" mb={2} color="gray.600">
                          Goals
                        </Text>
                        <VStack align="stretch" spacing={2}>
                          {plan.goals.map((goal, index) => (
                            <HStack key={index} spacing={3}>
                              <Box
                                w={2}
                                h={2}
                                borderRadius="full"
                                bg={goal.completed ? 'green.500' : 'gray.300'}
                              />
                              <Text
                                fontSize="sm"
                                textDecoration={goal.completed ? 'line-through' : 'none'}
                                color={goal.completed ? 'gray.500' : 'gray.700'}
                              >
                                {goal.description}
                              </Text>
                            </HStack>
                          ))}
                        </VStack>
                      </Box>
                    )}

                    {plan.activities && plan.activities.length > 0 && (
                      <Box>
                        <Text fontWeight="semibold" fontSize="sm" mb={2} color="gray.600">
                          Activities
                        </Text>
                        <HStack spacing={2} flexWrap="wrap">
                          {plan.activities.map((activity, index) => (
                            <Badge key={index} colorScheme="blue" variant="subtle">
                              {activity}
                            </Badge>
                          ))}
                        </HStack>
                      </Box>
                    )}
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default CarePlans;

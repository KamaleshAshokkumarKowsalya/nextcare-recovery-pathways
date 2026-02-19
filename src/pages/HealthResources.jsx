import { useState, useEffect } from 'react';
import { healthResourceAPI } from '../services/api';
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
  SimpleGrid,
  Input,
  Select,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const HealthResources = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    filterResources();
  }, [searchTerm, categoryFilter, resources]);

  const fetchResources = async () => {
    try {
      const response = await healthResourceAPI.getAll();
      setResources(response.data);
      setFilteredResources(response.data);
    } catch (error) {
      toast({
        title: 'Error loading resources',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const filterResources = () => {
    let filtered = [...resources];

    if (searchTerm) {
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((resource) => resource.category === categoryFilter);
    }

    setFilteredResources(filtered);
  };

  const getCategoryColor = (category) => {
    const colors = {
      article: 'blue',
      video: 'purple',
      exercise: 'green',
      guide: 'orange',
      tool: 'cyan',
      'support-group': 'pink',
      other: 'gray'
    };
    return colors[category] || 'gray';
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
            <Heading size="xl">Health Resources</Heading>
            <Text color="gray.600" mt={2}>
              Educational materials to support your recovery journey
            </Text>
          </Box>
          <Button colorScheme="primary" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </HStack>

        {/* Filters */}
        <Card>
          <CardBody>
            <HStack spacing={4}>
              <InputGroup flex={2}>
                <InputLeftElement>
                  <FiSearch />
                </InputLeftElement>
                <Input
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
              <Select
                flex={1}
                placeholder="All Categories"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="article">Article</option>
                <option value="video">Video</option>
                <option value="exercise">Exercise</option>
                <option value="guide">Guide</option>
                <option value="tool">Tool</option>
                <option value="support-group">Support Group</option>
              </Select>
            </HStack>
          </CardBody>
        </Card>

        {/* Results Count */}
        <Text color="gray.600">
          Showing {filteredResources.length} of {resources.length} resources
        </Text>

        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <Card>
            <CardBody>
              <Center py={10}>
                <VStack spacing={4}>
                  <Text fontSize="lg" color="gray.500">No resources found</Text>
                  <Text fontSize="sm" color="gray.400">
                    Try adjusting your search or filter criteria
                  </Text>
                </VStack>
              </Center>
            </CardBody>
          </Card>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredResources.map((resource) => (
              <Card
                key={resource._id}
                _hover={{ shadow: 'lg', transform: 'translateY(-4px)' }}
                transition="all 0.2s"
                cursor="pointer"
              >
                <CardBody>
                  <VStack align="stretch" spacing={3}>
                    <HStack justify="space-between">
                      <Badge colorScheme={getCategoryColor(resource.category)}>
                        {resource.category}
                      </Badge>
                      {resource.featured && (
                        <Badge colorScheme="yellow">Featured</Badge>
                      )}
                    </HStack>

                    <Heading size="md" noOfLines={2}>
                      {resource.title}
                    </Heading>

                    <Text fontSize="sm" color="gray.600" noOfLines={3}>
                      {resource.description}
                    </Text>

                    {resource.author && (
                      <Text fontSize="xs" color="gray.500">
                        By {resource.author}
                      </Text>
                    )}

                    <HStack justify="space-between" pt={2}>
                      {resource.duration && (
                        <Text fontSize="xs" color="gray.500">
                          {resource.duration}
                        </Text>
                      )}
                      {resource.views > 0 && (
                        <Text fontSize="xs" color="gray.500">
                          {resource.views} views
                        </Text>
                      )}
                    </HStack>

                    {resource.tags && resource.tags.length > 0 && (
                      <HStack spacing={2} flexWrap="wrap">
                        {resource.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="subtle" fontSize="xs">
                            {tag}
                          </Badge>
                        ))}
                      </HStack>
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

export default HealthResources;

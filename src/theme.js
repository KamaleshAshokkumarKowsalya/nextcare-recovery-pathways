import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3',
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1',
    },
    secondary: {
      50: '#f3e5f5',
      100: '#e1bee7',
      200: '#ce93d8',
      300: '#ba68c8',
      400: '#ab47bc',
      500: '#9c27b0',
      600: '#8e24aa',
      700: '#7b1fa2',
      800: '#6a1b9a',
      900: '#4a148c',
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  semanticTokens: {
    colors: {
      'bg.canvas': {
        default: 'gray.50',
        _dark: 'gray.900'
      },
      'bg.surface': {
        default: 'white',
        _dark: 'gray.800'
      },
      'bg.muted': {
        default: 'gray.100',
        _dark: 'gray.700'
      },
      'text.primary': {
        default: 'gray.800',
        _dark: 'gray.100'
      },
      'text.secondary': {
        default: 'gray.600',
        _dark: 'gray.200'
      },
      'border.subtle': {
        default: 'gray.200',
        _dark: 'gray.600'
      }
    }
  },
  styles: {
    global: {
      body: {
        bg: 'bg.canvas',
        color: 'text.primary'
      }
    }
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'primary',
      },
    },
    Text: {
      baseStyle: {
        color: 'text.primary'
      },
    },
    Heading: {
      baseStyle: {
        color: 'text.primary'
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'bg.surface',
          borderColor: 'border.subtle'
        }
      }
    },
    Input: {
      variants: {
        outline: {
          field: {
            bg: 'bg.surface',
            borderColor: 'border.subtle',
            _placeholder: { color: 'text.secondary' }
          }
        }
      }
    },
    Select: {
      variants: {
        outline: {
          field: {
            bg: 'bg.surface',
            borderColor: 'border.subtle',
            _placeholder: { color: 'text.secondary' }
          }
        }
      }
    },
    Textarea: {
      variants: {
        outline: {
          bg: 'bg.surface',
          borderColor: 'border.subtle',
          _placeholder: { color: 'text.secondary' }
        }
      }
    }
  },
});

export default theme;

import React, { FC } from 'react';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';

export const Header: FC = () => {
  return (
    <>
      <header>
        <Flex
          as="nav"
          align="center"
          bg="teal.500"
          color="white"
          justify="space-between"
          padding={6}
        >
          <Flex align="center">
            <Heading
              as="h1"
              size="lg"
              letterSpacing={'tighter'}
            >
              Google Tasks App
            </Heading>
          </Flex>
          <Box d="block">
            <Button
              bg="teal.500"
              variant="outline"
              _hover={{ bg: 'teal.700', borderColor: 'teal.700' }}
            >
              sign in
            </Button>
          </Box>
        </Flex>
      </header>
    </>
  );
};

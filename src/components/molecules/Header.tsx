import React, { FC, MouseEventHandler } from 'react';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';

type Props = {
  isSignedIn: boolean;
  onAuthorizationClick: MouseEventHandler<HTMLButtonElement>;
};

export const Header: FC<Props> = ({ isSignedIn, onAuthorizationClick }) => {
  return (
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
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            Google Tasks App
          </Heading>
        </Flex>
        <Box d="block">
          <Button
            bg="teal.500"
            onClick={onAuthorizationClick}
            variant="outline"
            _hover={{ bg: 'teal.700', borderColor: 'teal.700' }}
          >
            {isSignedIn ? 'sign out' : 'sign in'}
          </Button>
        </Box>
      </Flex>
    </header>
  );
};

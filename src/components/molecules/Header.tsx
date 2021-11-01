import React, { FC, MouseEventHandler, useEffect } from 'react';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';

type Props = {
  isSignedIn: Boolean;
  onAuthorizationClick: MouseEventHandler<HTMLButtonElement>;
};

export const Header: FC<Props> = (props) => {
  useEffect(() => {}, [props.isSignedIn]);
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
            <Heading as="h1" size="lg" letterSpacing={'tighter'}>
              Google Tasks App
            </Heading>
          </Flex>
          <Box d="block">
            <Button
              bg="teal.500"
              onClick={props.onAuthorizationClick}
              variant="outline"
              _hover={{ bg: 'teal.700', borderColor: 'teal.700' }}
            >
              {props.isSignedIn ? 'sign out' : 'sign in'}
            </Button>
          </Box>
        </Flex>
      </header>
    </>
  );
};

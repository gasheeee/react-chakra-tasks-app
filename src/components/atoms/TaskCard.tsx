import React, { FC } from 'react';
import {Box, Flex, IconButton, Text} from '@chakra-ui/react';
import { EditIcon} from "@chakra-ui/icons";

type Props = {
  title?: string,
  updatedTime?: string,
  content?: string
};

export const TaskCard: FC<Props> = (props) => {
  const {
    title,
    updatedTime,
    content
  } = props;

  return (
    <Box
      shadow='md'
      borderWidth='1px'
      p='4'
    >
      <Flex align='top' justify='space-between'>
        <Text
          fontSize='lg'
          mb='3'
        >{`${title} content`}</Text>
        <IconButton
          variant="outline"
          aria-label="edit task"
          icon={<EditIcon />} />
      </Flex>
      <Text
        color='gray.500'
        fontSize='md'
        mb='2'
      >{updatedTime}</Text>
      <Text
        fontSize='md'
      >{content}</Text>
    </Box>
  );
};

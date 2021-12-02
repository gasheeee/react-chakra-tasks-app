import React, { FC } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, HamburgerIcon } from '@chakra-ui/icons';

type Props = {
  title?: string;
  updatedTime?: string;
  content?: string;
  deleteTask: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
};

export const TaskCard: FC<Props> = (props) => {
  const { title, updatedTime, content, deleteTask } = props;

  return (
    <Box shadow="md" borderWidth="1px" p="4">
      <Flex align="top" justify="space-between">
        <Text fontSize="lg" mb="3">
          {title}
        </Text>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="edit task"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem icon={<EditIcon />}>edit</MenuItem>
            <MenuItem icon={<DeleteIcon />} onClick={deleteTask}>
              delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Text color="gray.500" fontSize="md" mb="2">
        {updatedTime}
      </Text>
      <Text fontSize="md">{content}</Text>
    </Box>
  );
};

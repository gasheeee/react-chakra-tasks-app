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
  content?: string;
  updatedButtonTap: (event: React.MouseEvent<HTMLButtonElement>) => void;
  deleteButtonTap: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => Promise<void>;
};

export const TaskCard: FC<Props> = (props) => {
  const { title, content, updatedButtonTap, deleteButtonTap } = props;

  return (
    <Box shadow="md" borderWidth="1px" p={4}>
      <Flex align="top" justify="space-between">
        <Text fontSize="lg" mb={3}>
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
            <MenuItem icon={<EditIcon />} onClick={updatedButtonTap}>
              edit
            </MenuItem>
            <MenuItem icon={<DeleteIcon />} onClick={deleteButtonTap}>
              delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Text fontSize="md">{content}</Text>
    </Box>
  );
};

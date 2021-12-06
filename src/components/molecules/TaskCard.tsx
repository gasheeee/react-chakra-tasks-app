import React, { Dispatch, FC, SetStateAction } from 'react';
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
import { TaskForm } from '../atoms/TaskForm';

type Props = {
  title?: string;
  content?: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  updateTask: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  updatedButtonTap: (event: React.MouseEvent<HTMLButtonElement>) => void;
  cancelButtonTap: (event: React.MouseEvent<HTMLButtonElement>) => void;
  deleteButtonTap: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => Promise<void>;
};

export const TaskCard: FC<Props> = (props) => {
  const {
    title,
    content,
    setTitle,
    setDescription,
    updateTask,
    updatedButtonTap,
    cancelButtonTap,
    deleteButtonTap,
  } = props;
  const isEdit = false;

  return (
    <Box shadow="md" borderWidth="1px" p={4}>
      {isEdit ? (
        <>
          <TaskForm
            title={'title'}
            description={'content'}
            setTitle={setTitle}
            setDescription={setDescription}
            submitButtonText={'更新'}
            submitForm={updateTask}
            cancelButtonTap={cancelButtonTap}
          ></TaskForm>
        </>
      ) : (
        <>
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
        </>
      )}
    </Box>
  );
};

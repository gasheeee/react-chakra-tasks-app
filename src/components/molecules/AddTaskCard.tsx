import React, { Dispatch, FC, SetStateAction } from 'react';
import { Box } from '@chakra-ui/react';
import { TaskForm } from '../atoms/TaskForm';

type Props = {
  newTitle: string;
  newDescription: string;
  setNewTitle: Dispatch<SetStateAction<string>>;
  setNewDescription: Dispatch<SetStateAction<string>>;
  submitNewTask: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  cancelButtonTap: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const AddTaskCard: FC<Props> = (props) => {
  const {
    newTitle,
    newDescription,
    setNewTitle,
    setNewDescription,
    submitNewTask,
    cancelButtonTap,
  } = props;

  return (
    <Box shadow="md" borderWidth="1px" p={4}>
      <TaskForm
        title={newTitle}
        description={newDescription}
        setTitle={setNewTitle}
        setDescription={setNewDescription}
        submitButtonText={'追加'}
        submitForm={submitNewTask}
        cancelButtonTap={cancelButtonTap}
      ></TaskForm>
    </Box>
  );
};

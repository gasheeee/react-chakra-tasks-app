import React, { Dispatch, FC, SetStateAction } from 'react';
import { Box } from '@chakra-ui/react';
import { TaskForm } from '../atoms/TaskForm';

type Props = {
  title: string;
  description: string;
  submitButtonText: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  submitButtonTap: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  cancelButtonTap: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const AddTaskCard: FC<Props> = (props) => {
  const {
    title,
    description,
    submitButtonText,
    setTitle,
    setDescription,
    submitButtonTap,
    cancelButtonTap,
  } = props;

  return (
    <Box shadow="md" borderWidth="1px" p={4}>
      <TaskForm
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        submitButtonText={submitButtonText}
        submitForm={submitButtonTap}
        cancelButtonTap={cancelButtonTap}
      ></TaskForm>
    </Box>
  );
};

import React, { Dispatch, FC, SetStateAction } from 'react';
import { Button, Flex, Input, Textarea } from '@chakra-ui/react';

type Props = {
  title: string;
  description: string;
  submitButtonText: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  submitForm: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  cancelButtonTap: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const TaskForm: FC<Props> = (props) => {
  const {
    title,
    description,
    setTitle,
    setDescription,
    submitButtonText,
    submitForm,
    cancelButtonTap,
  } = props;

  return (
    <form onSubmit={submitForm}>
      <Input
        mb={2}
        placeholder="title"
        size="md"
        onChange={(e) => setTitle(e.currentTarget.value)}
        value={title}
        variant="flushed"
      />
      <Textarea
        mb={2}
        placeholder="description"
        size="sm"
        onChange={(e) => setDescription(e.currentTarget.value)}
        value={description}
      />
      <Flex align="flex-start" justify="flex-end">
        <Button type="submit" colorScheme="teal" variant="solid">
          {submitButtonText}
        </Button>
        <Button
          color="gray"
          colorScheme="gray"
          variant="outline"
          ml={2}
          onClick={cancelButtonTap}
        >
          cancel
        </Button>
      </Flex>
    </form>
  );
};

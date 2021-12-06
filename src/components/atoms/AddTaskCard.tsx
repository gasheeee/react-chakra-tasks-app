import React, { Dispatch, FC, SetStateAction } from 'react';
import { Box, Button, Flex, Input } from '@chakra-ui/react';

type Props = {
  title: string;
  description: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  submitNewTask: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export const AddTaskCard: FC<Props> = (props) => {
  const { title, description, setTitle, setDescription, submitNewTask } = props;

  return (
    <Box shadow="md" borderWidth="1px" p="4">
      <form onSubmit={submitNewTask}>
        <Input
          mb={2}
          placeholder="title"
          size="md"
          onChange={(e) => setTitle(e.currentTarget.value)}
          value={title}
          variant="flushed"
        />
        <Input
          mb={2}
          placeholder="description"
          size="sm"
          onChange={(e) => setDescription(e.currentTarget.value)}
          value={description}
          variant="flushed"
        />
        <Flex align="flex-start" justify="flex-end">
          <Button type="submit" colorScheme="teal" variant="solid">
            追加
          </Button>
          <Button color="gray" colorScheme="gray" variant="outline" ml={2}>
            キャンセル
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

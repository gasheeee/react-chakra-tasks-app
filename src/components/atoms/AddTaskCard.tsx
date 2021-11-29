import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {
  Box, Button, Flex, Input,
} from '@chakra-ui/react';

type Props = {
  setTitle: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>
  submitNewTask: () => void;
};

export const AddTaskCard: FC<Props> = (props) => {
  const { setTitle, setDescription, submitNewTask } = props;

  return (
    <Box shadow="md" borderWidth="1px" p="4">
      <form onSubmit={submitNewTask}>
        <Input mb={2} placeholder='title' size='md' onChange={e => setTitle(e.currentTarget.value)} variant='flushed' />
        <Input mb={2} placeholder='description' size='sm' onChange={e => setDescription(e.currentTarget.value)} variant='flushed' />
        <Flex align='flex-start' justify='flex-end'>
          <Button type='submit' colorScheme='teal' variant='solid'>追加</Button>
          <Button color='gray' colorScheme='gray' variant='outline' ml={2}>キャンセル</Button>
        </Flex>
      </form>
    </Box>
  );
};

import React from 'react';
import { useSelector } from 'react-redux';
import { Todo } from './todo';
import { selectTodos } from '../../features/todo/todosSlice';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import json2mq from 'json2mq';
export const TodoList = () => {
  const todosIds = useSelector(selectTodos);

  return (
    <Box
      sx={{
        width: '70vw',
        height: useMediaQuery(json2mq({ minHeight: 630 })) ? '50vh' : '40vh',
        mx: 'auto',
        overflow: 'hidden',
      }}
    >
      {Object.values(todosIds).map((todoId) => {
        return <Todo todo={todoId} key={todoId.id} />;
      })}
    </Box>
  );
};

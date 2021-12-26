import React, { useState } from 'react';
import { addTodo } from '../../features/todo/todosSlice';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Button, TextField, Box, useMediaQuery } from '@mui/material';
import json2mq from 'json2mq';
export default function TodoForm() {
  const [name, setName] = useState('');
  const [info, setInfo] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }

    const newTodo = { id: uuidv4(), name: name, info: info };
    dispatch(addTodo(newTodo));

    setName('');
    setInfo('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      autoComplete="off"
      sx={{
        display: 'flex',
        width: 'fit-content',
        mx: 'auto',
        alignItems: 'center',
      }}
    >
      <TextField
        variant="standard"
        label="Todo"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        sx={{ m: 1 }}
      />
      <TextField
        variant="standard"
        onChange={(e) => setInfo(e.currentTarget.value)}
        value={info}
        label="More info"
        placeholder="Add more info if you want"
        sx={{ m: 1 }}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        type="submit"
        sx={{ height: 'fit-content' }}
      >
        {useMediaQuery(json2mq({ minWidth: 580 })) ? 'Add todo' : 'Add'}
      </Button>
    </Box>
  );
}

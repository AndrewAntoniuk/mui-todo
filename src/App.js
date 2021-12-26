import React from 'react';
import TodoForm from './componets/todo/todoFormAdd';
import { Weather } from './componets/weather/weather';
import { TodoList } from './componets/todo/todoList';
import { Quote } from './componets/quotes/quote';
import { Unsplash } from './componets/unsplash/unsplash';
import Container from '@mui/material/Container';

function App() {
  return (
    <Container
      maxWidth="100vw"
      sx={{
        backgroundColor: 'rgba(255,255,255,0.4)',
        height: '100vh',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <Weather />
      <TodoForm />
      <TodoList />
      <Quote />
      <Unsplash />
    </Container>
  );
}

export default App;

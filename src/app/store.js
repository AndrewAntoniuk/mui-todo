import { configureStore } from '@reduxjs/toolkit';
import { todosReducer } from '../features/todo/todosSlice';
import { weatherReducer } from '../features/weather/weatherSlice';
import quoteReducer from '../features/quotes/quoteSlice';
import unsplashReducer from '../features/unsplash/unsplashSlice';
export const store = configureStore({
  reducer: {
    todos: todosReducer,
    weather: weatherReducer,
    quote: quoteReducer,
    background: unsplashReducer,
  },
});

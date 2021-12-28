import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// This is the key you copied from step 2.
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
const API_URL = `https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}`;

/**
 * @param {string} query - The query used to find relevant images.
 */

export const loadImage = async (src) => {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.addEventListener('load', resolve);
    image.addEventListener('error', reject);
    image.src = src;
  });
};

export const getImages = createAsyncThunk('background/getImages', async () => {
  const response = await fetch(`${API_URL}&query=background`);
  const json = await response.json();
  return json;
});

const unsplashSlice = createSlice({
  name: 'background',
  initialState: {
    background: {},
    isLoadingImages: false,
    isFailedToLoadImages: false,
    counter: 0,
  },
  reducers: {
    increment: (state) => {
      if (state.counter !== 9) {
        state.counter = state.counter + 1;
      } else state.counter = 0;
    },
    decrement: (state) => {
      if (state.counter !== 0) {
        state.counter = state.counter - 1;
      } else state.counter = 9;
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(getImages.pending, (state) => {
        state.isLoadingImages = true;
        state.isFailedToLoadImages = false;
      })
      .addCase(getImages.fulfilled, (state, action) => {
        if (action.payload) {
          state.background = action.payload;
          state.isFailedToLoadImages = false;
          state.isLoadingImages = false;
          state.error = undefined;
          state.counter = 4;
        } else {
          state.isLoadingImages = false;
          state.isFailedToLoadImages = true;
          state.error = 'Problems with fetching';
        }
      })
      .addCase(getImages.rejected, (state) => {
        state.isFailedToLoadImages = true;
        state.isLoadingImages = false;
      }),
});

export const selectImages = (state) => state.background.background;
export const selectCounter = (state) => state.background.counter;
export const increment = unsplashSlice.actions.increment;
export const decrement = unsplashSlice.actions.decrement;
const unsplashReducer = unsplashSlice.reducer;
export default unsplashReducer;

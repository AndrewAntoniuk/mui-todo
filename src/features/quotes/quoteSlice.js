import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_URL = `https://quotes.rest/qod?language=en`;

export const getQuote = createAsyncThunk('quote/getQuote', async () => {
  const response = await fetch(API_URL);
  const json = await response.json();
  return json;
});

const quoteSlice = createSlice({
  name: 'quote',
  initialState: {
    quote: {},
    isLoadingQuote: false,
    isFailedToGetQuote: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(getQuote.pending, (state) => {
        state.isFailedToGetQuote = false;
        state.isLoadingQuote = true;
      })
      .addCase(getQuote.fulfilled, (state, action) => {
        state.isLoadingQuote = false;
        state.isFailedToGetQuote = false;
        state.quote = action.payload;
      })
      .addCase(getQuote.rejected, (state) => {
        state.isFailedToGetQuote = true;
        state.isLoadingQuote = false;
      }),
});

export const selectQuote = (state) => state.quote.quote;
const quoteReducer = quoteSlice.reducer;
export default quoteReducer;

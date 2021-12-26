import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const openWeatherKey = `${process.env.REACT_APP_WEATHER}`;
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

const getGeolocation = createAsyncThunk('weather/getGeolocation', () => {
  // this is the payload creator function
  //return a promise
  return new Promise((resolve, reject) =>
    !navigator.geolocation
      ? reject('Geolocation not supported')
      : navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) =>
            resolve({ latitude, longitude }),
          reject //reject promise when there is an error
        )
  );
});

export const loadWeather = createAsyncThunk(
  'weather/loadWeather',
  async ({ cityName }, thunkAPI) => {
    if (cityName) {
      const urlToFetch = `${weatherUrl}?&q=${cityName}&APPID=${openWeatherKey}&lang=uk`;
      try {
        const response = await fetch(urlToFetch);
        const jsonResponse = await response.json();

        return jsonResponse;
      } catch (error) {}
    }
    await thunkAPI.dispatch(getGeolocation()); // One action depens on another action, so we need thunkAPI to solve it
    const { lat, lon } = await thunkAPI.getState(weatherSlice).weather.location;
    const urlToFetch = `${weatherUrl}?lat=${lat}&lon=${lon}&APPID=${openWeatherKey}&lang=uk`;

    try {
      const response = await fetch(urlToFetch);
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch (error) {}
  }
);

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weather: {},
    isLoadingWeather: false,
    failedToLoadWeather: false,
    isLoadingGeolocation: false,
    failedToLoadGeolocation: false,
    location: {
      lat: null,
      lon: null,
      isRejected: false,
    },
  },
  reducers: {
    deleteWeather: (state, action) => {
      state.weather = {};
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(loadWeather.pending, (state) => {
        state.isLoadingWeather = true;
        state.failedToLoadWeather = false;
      })
      .addCase(loadWeather.rejected, (state) => {
        state.isLoadingWeather = false;
        state.failedToLoadWeather = true;
      })
      .addCase(loadWeather.fulfilled, (state, action) => {
        if (!action.payload.name) {
          state.failedToLoadWeather = true;
          state.isLoadingWeather = false;
          state.error = 'Problem with request';
        } else {
          const { name, main, weather } = action.payload;
          const zeroIndexWeather = weather[0];
          state.isLoadingWeather = false;
          state.failedToLoadWeather = false;
          state.weather = { main, name, zeroIndexWeather };
          state.error = undefined;
        }
      })
      .addCase(getGeolocation.pending, (state) => {
        state.isLoadingGeolocation = true;
        state.failedToLoadGeolocation = false;
      })
      .addCase(getGeolocation.rejected, (state, action) => {
        state.isLoadingGeolocation = false;
        state.failedToLoadGeolocation = true;
        state.location.isRejected = true;
      })
      .addCase(getGeolocation.fulfilled, (state, action) => {
        state.isLoadingGeolocation = false;
        state.failedToLoadGeolocation = false;
        state.location.lat = action.payload.latitude;
        state.location.lon = action.payload.longitude;
      }),
});

export const weatherReducer = weatherSlice.reducer;
export const selectWeather = (state) => state.weather.weather;
export const selectGeolocation = (state) => state.weather.location;
export const { deleteWeather } = weatherSlice.actions;

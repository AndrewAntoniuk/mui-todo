import {
  loadWeather,
  selectGeolocation,
} from '../../features/weather/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import { WeatherShow } from './weatherShow';
import { Button, TextField } from '@mui/material/';
import { selectWeather } from '../../features/weather/weatherSlice';
import IconButton from '@mui/material/IconButton';
import { deleteWeather } from '../../features/weather/weatherSlice';
import AutorenewIcon from '@mui/icons-material/Autorenew';
export const Weather = () => {
  const location = useSelector(selectGeolocation);
  const { isRejected } = location;
  const [cityName, setCityName] = useState('');
  const dispatch = useDispatch();
  const weather = useSelector(selectWeather);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //dispatch(getGeolocation());
    if (cityName || !isRejected) {
      dispatch(loadWeather({ cityName }));
    }
    setCityName('');
  };

  const handleDispatch = (e) => {
    dispatch(deleteWeather());
  };

  let [city, temp, iconLink] = [];

  if (Object.values(weather).length) {
    city = weather.name;
    temp = Math.floor(weather.main.temp - 273.15);
    iconLink = `https://openweathermap.org/img/wn/${weather.zeroIndexWeather.icon}@2x.png`;
  }
  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: 3,
        my: 2,
        height: 120,
        maxWidth: 'fit-content',
        mx: 'auto',
        bgcolor: 'rgba(0,0,0, 0.3)',
        transform: !Object.keys(weather).length ? null : 'rotateX(360deg)',
        transition: 'transform .7s',
      }}
    >
      {!Object.keys(weather).length ? (
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          style={{ textAlign: 'center' }}
        >
          <TextField
            id="filled-basic"
            label="City"
            value={cityName}
            onChange={(e) => setCityName(e.currentTarget.value)}
            variant="standard"
          />
          <br />
          <Button
            variant="contained"
            type="submit"
            onClick={handleSubmit}
            sx={{ my: 1 }}
          >
            Check Weather
          </Button>
        </form>
      ) : (
        <>
          <WeatherShow city={city} iconLink={iconLink} temp={temp} />
          <IconButton aria-label="reset" onClick={handleDispatch}>
            <AutorenewIcon color="warning" />
          </IconButton>
        </>
      )}
    </Paper>
  );
};

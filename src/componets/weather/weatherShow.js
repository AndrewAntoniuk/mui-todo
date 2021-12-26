import React from 'react';
import { Typography, useMediaQuery } from '@mui/material';
import json2mq from 'json2mq';
export const WeatherShow = ({ iconLink, city, temp }) => {
  return (
    <>
      <img src={iconLink} alt="weather icon" id="icon" width={75} />
      <Typography
        variant={useMediaQuery(json2mq({ minWidth: 540 })) ? 'h3' : 'h5'}
        sx={{ color: 'white' }}
      >
        {city}, {temp}°C
      </Typography>
    </>
  );
};

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrement,
  getImages,
  increment,
  loadImage,
  selectCounter,
  selectImages,
} from '../../features/unsplash/unsplashSlice';
import { IconButton, Link, Paper } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const Unsplash = () => {
  const images = useSelector(selectImages);
  const dispatch = useDispatch();
  const counter = useSelector(selectCounter);
  const handleClick = (e) => {
    switch (e.currentTarget.value) {
      case 'next': {
        dispatch(increment());
        break;
      }
      case 'prev': {
        dispatch(decrement());
        break;
      }
      default:
        break;
    }
  };
  useEffect(() => {
    if (!Object.keys(images).length) dispatch(getImages());
  }, [dispatch, images]);
  useEffect(() => {
    if (Object.keys(images).length) {
      const root = document.getElementById('root');
      loadImage(images.results[counter].urls.regular).then(() => {
        root.style.backgroundSize = `cover`;
        root.style.backgroundRepeat = `no-repeat`;
        root.style.backgroundImage = `url(${images.results[counter].urls.regular}) `;
      });
    }
  }, [counter, images]);
  if (Object.keys(images).length)
    return (
      <>
        <IconButton
          name="next background"
          onClick={handleClick}
          value="next"
          sx={{ position: 'absolute', right: 0, top: '50vh', color: 'black' }}
          size="large"
        >
          <ArrowForwardIosIcon value="next" size="inherit" />
        </IconButton>
        <IconButton
          name="previous background"
          onClick={handleClick}
          value="prev"
          sx={{ position: 'absolute', left: 0, top: '50vh', color: 'black' }}
          size="large"
        >
          <ArrowBackIosNewIcon value="prev" size="inherit" />
        </IconButton>

        <Paper
          sx={{
            backgroundColor: 'rgba(0,0,0, 0.3)',
            color: 'white',
            textAlign: 'center',
            width: 'fit-content ',
            position: 'absolute',
            bottom: 10,
            right: 10,
            p: 1,
          }}
        >
          Photo by{' '}
          <Link
            href={images.results[counter].user.links.html}
            target="_blank"
            rel="noreferrer"
            sx={{ color: 'black' }}
          >
            {images.results[counter].user.name}
          </Link>{' '}
          on{' '}
          <Link
            href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral"
            target="_blank"
            rel="noreferrer"
            sx={{ color: 'black' }}
          >
            Unsplash{' '}
          </Link>
        </Paper>
      </>
    );
  return null;
};

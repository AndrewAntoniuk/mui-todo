import { useEffect } from 'react';
import { getQuote, selectQuote } from '../../features/quotes/quoteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from '@mui/material';

export const Quote = () => {
  const dispatch = useDispatch();
  const quoteObj = useSelector(selectQuote);
  useEffect(() => {
    if (!Object.keys(quoteObj).length) dispatch(getQuote());
  }, [dispatch, quoteObj]);

  if (Object.keys(quoteObj).length && !quoteObj.error) {
    const quote = quoteObj.contents.quotes[0].quote;

    return (
      <Paper
        sx={{
          p: 1,
          textAlign: 'center',
          mt: 1,
          mx: 'auto',
          backgroundColor: 'rgba(0,0,0, 0.3)',
          color: 'white',
          width: '70vw',
        }}
      >
        {quote}
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        p: 1,
        textAlign: 'center',
        mt: 1,
        mx: 'auto',
        width: '70vw',
        backgroundColor: 'rgba(0,0,0, 0.3)',
        color: 'white',
      }}
    >
      Too many requests
    </Paper>
  );
};

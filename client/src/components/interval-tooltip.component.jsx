import { useSelector } from 'react-redux';

import { Typography } from '@mui/material';

import { selectTickersInterval } from '../store/stocks/stocks.selector';

const IntervalTooltip = () => {
  const interval = useSelector(selectTickersInterval);

  return (
    <Typography variant='subtitle1' sx={{ mb: 1, fontSize: 18 }}>
      Tickers Interval: {interval} second{interval > 1 && 's'}
    </Typography>
  );
};

export default IntervalTooltip;

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Box, Button, TextField } from '@mui/material';

import IntervalTooltip from './interval-tooltip/interval-tooltip.component';

import { setTickersInterval } from '../store/stocks/stocks.action';

const SetTickersInterval = () => {
  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();

  const handleChange = (e) => setInputValue(e.target.value);

  const handleSubmit = () => {
    if (!inputValue) return;

    dispatch(setTickersInterval(inputValue));
    setInputValue('');
  };

  return (
    <Box>
      <IntervalTooltip />
      <TextField
        sx={{ width: '210px' }}
        label='Interval (sec)'
        type='number'
        value={inputValue}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <Button variant='contained' onClick={handleSubmit}>
              Submit
            </Button>
          ),
        }}
      />
    </Box>
  );
};

export default SetTickersInterval;

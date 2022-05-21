import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setTickersInterval } from '../store/stocks/stocks.action';

import { Button, TextField } from '@mui/material';

const SetTickersInterval = () => {
  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();

  const handleChange = (e) => setInputValue(e.target.value);

  const handleSubmit = () => {
    dispatch(setTickersInterval(inputValue));
    setInputValue('');
  };

  return (
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
  );
};

export default SetTickersInterval;

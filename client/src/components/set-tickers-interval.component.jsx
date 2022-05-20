import { useState } from 'react';

import { Button, TextField } from '@mui/material';

import socket from '../connection/socket';

const SetTickersInterval = () => {
  const [value, setValue] = useState('');

  const handleChange = (e) => setValue(e.target.value);

  const handleInterval = () => {
    const interval = (value < 1 ? 1 : Math.round(value)) * 1000;
    socket.emit('set interval', interval);
    setValue('');
  };

  return (
    <TextField
      sx={{ width: '210px' }}
      label='Interval (sec)'
      type='number'
      value={value}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <Button variant='contained' onClick={handleInterval}>
            Submit
          </Button>
        ),
      }}
    />
  );
};

export default SetTickersInterval;

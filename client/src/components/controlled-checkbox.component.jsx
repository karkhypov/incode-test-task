import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { watchUnwatchTicker } from '../store/stocks/stocks.action';

import { Switch } from '@mui/material';

const ControlledSwitch = ({ ticker }) => {
  const [checked, setChecked] = useState(true);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setChecked(e.target.checked);
    dispatch(watchUnwatchTicker({ ticker, bool: checked }));
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
};

export default ControlledSwitch;

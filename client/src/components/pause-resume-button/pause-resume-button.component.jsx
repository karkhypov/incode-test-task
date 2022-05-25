import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';

import { selectStocksIsPaused } from '../../store/stocks/stocks.selector';
import { fetchStocksPause, fetchStocksResume } from '../../store/stocks/stocks.action';

const buttonStyles = {
  height: '45px',
  width: '95px',
};

const PauseResumeButton = () => {
  const dispatch = useDispatch();

  const isPaused = useSelector(selectStocksIsPaused);

  const handlePause = () => {
    dispatch(fetchStocksPause());
  };

  const handleResume = () => {
    dispatch(fetchStocksResume());
  };

  return isPaused ? (
    <Button sx={buttonStyles} variant='contained' onClick={handleResume}>
      Resume
    </Button>
  ) : (
    <Button sx={buttonStyles} variant='contained' color='error' onClick={handlePause}>
      Pause
    </Button>
  );
};

export default PauseResumeButton;

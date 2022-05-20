import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from '@mui/system';
import { Grid, CircularProgress, Button, FormControl, TextField } from '@mui/material';

import {
  selectStocksData,
  selectStocksIsLoading,
  selectStocksIsPaused,
} from './store/stocks/stocks.selector';
import {
  fetchStocks,
  fetchStocksUpdate,
  fetchStocksPause,
  fetchStocksResume,
} from './store/stocks/stocks.action';

import socket from './connection/socket';

import StockTable from './components/stock-table.component';

import './App.css';

const App = () => {
  const [value, setValue] = useState('');

  const dispatch = useDispatch();

  const data = useSelector(selectStocksData);
  const isLoading = useSelector(selectStocksIsLoading);
  const isPaused = useSelector(selectStocksIsPaused);

  useEffect(() => {
    dispatch(fetchStocks());
    dispatch(fetchStocksUpdate());
  }, [dispatch]);

  const handlePause = () => {
    dispatch(fetchStocksPause());
  };

  const handleResume = () => {
    dispatch(fetchStocksResume());
  };

  const handleInterval = () => {
    const interval = (value < 1 ? 1 : Math.round(value)) * 1000;
    socket.emit('set interval', interval);
    setValue('');
  };

  return (
    <Container>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        sx={{ minHeight: '100vh' }}
      >
        {isLoading || data.length === 0 ? (
          <CircularProgress />
        ) : (
          <StockTable data={data} />
        )}
        {isPaused ? (
          <Button variant='contained' onClick={handleResume}>
            Resume
          </Button>
        ) : (
          <Button variant='contained' color='error' onClick={handlePause}>
            Pause
          </Button>
        )}
        <FormControl sx={{ display: 'flex' }}>
          <TextField
            label='Interval (sec)'
            type='number'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button variant='contained' onClick={handleInterval}>
            Submit
          </Button>
        </FormControl>
      </Grid>
    </Container>
  );
};

export default App;

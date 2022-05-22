import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Container } from '@mui/system';
import { Grid } from '@mui/material';

import { fetchStocks, fetchStocksUpdate } from './store/stocks/stocks.action';

import StockTable from './components/stock-table/stock-table.component';
import PauseResumeButton from './components/pause-resume-button.component';
import SetTickersInterval from './components/set-tickers-interval.component';
import IntervalTooltip from './components/interval-tooltip.component';

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStocks());
    dispatch(fetchStocksUpdate());
  }, [dispatch]);

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
        <StockTable />
        <IntervalTooltip />
        <PauseResumeButton />
        <SetTickersInterval />
      </Grid>
    </Container>
  );
};

export default App;

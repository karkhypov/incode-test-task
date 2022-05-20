import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from '@mui/system';
import { Grid, CircularProgress } from '@mui/material';

import { selectStocksData, selectStocksIsLoading } from './store/stocks/stocks.selector';
import { fetchStocks, fetchStocksUpdate } from './store/stocks/stocks.action';

import StockTable from './components/stock-table.component';
import PauseResumeButton from './components/pause-resume-button.component';
import SetTickersInterval from './components/set-tickers-interval.component';

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  const data = useSelector(selectStocksData);
  const isLoading = useSelector(selectStocksIsLoading);

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
        {isLoading || data.length === 0 ? (
          <CircularProgress />
        ) : (
          <StockTable data={data} />
        )}

        <PauseResumeButton />
        <SetTickersInterval />
      </Grid>
    </Container>
  );
};

export default App;

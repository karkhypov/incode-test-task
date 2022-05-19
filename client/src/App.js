import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container } from '@mui/system';
import { Grid } from '@mui/material';
import { CircularProgress } from '@mui/material';

import { selectStocksData, selectStocksIsLoading } from './store/stocks/stocks.selector';
import { fetchStocks, fetchStocksUpdate } from './store/stocks/stocks.action';

import StockTable from './components/stock-table.component';

import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectStocksData);
  const isLoading = useSelector(selectStocksIsLoading);

  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchStocksUpdate());
  }, [dispatch]);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
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
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;

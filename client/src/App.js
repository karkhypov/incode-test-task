import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CircularProgress } from '@mui/material';

import MainPage from './pages/main-page.component';

import { fetchStocks, fetchStocksUpdate } from './store/stocks/stocks.action';
import { selectStocksIsLoading } from './store/stocks/stocks.selector';

import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectStocksIsLoading);

  useEffect(() => {
    dispatch(fetchStocks());
    dispatch(fetchStocksUpdate());
  }, [dispatch]);

  return isLoading || isLoading === 'initial' ? <CircularProgress /> : <MainPage />;
};

export default App;

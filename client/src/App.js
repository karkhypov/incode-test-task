import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import MainPage from './pages/main-page.component';

import { fetchStocks, fetchStocksUpdate } from './store/stocks/stocks.action';

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStocks());
    dispatch(fetchStocksUpdate());
  }, [dispatch]);

  return <MainPage />;
};

export default App;

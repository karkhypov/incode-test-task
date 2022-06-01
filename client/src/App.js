import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import MainPage from './pages/main-page.component';

import { fetchStocks, fetchStocksUpdate } from './store/stocks/stocks.action';

import socket from './connection/socket';

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStocks());
    dispatch(fetchStocksUpdate());

    return () => socket.disconnect();
  }, [dispatch]);

  return <MainPage />;
};

export default App;

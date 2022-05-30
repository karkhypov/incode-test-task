import { STOCKS_ACTION_TYPES } from './stocks.types';
import { createAction } from '../../utils/reducer/reducer.utils';
import {
  stocksAndInterval,
  checkInterval,
} from '../../utils/reducer/stocks.reducer.utils';

import socket from '../../connection/socket';

export const fetchStocksStart = () => {
  socket.emit('start');
  return createAction(STOCKS_ACTION_TYPES.FETCH_STOCKS_START);
};

export const fetchStocksSuccess = (stocksArray) =>
  createAction(STOCKS_ACTION_TYPES.FETCH_STOCKS_SUCCESS, stocksArray);

export const fetchStocks = () => (dispatch) => {
  socket.once('initial', (stocksArray, interval) => {
    dispatch(fetchStocksSuccess(stocksAndInterval(stocksArray, interval)));
  });
  dispatch(fetchStocksStart());
};

export const fetchStocksUpdateSuccess = (stocksArray) =>
  createAction(STOCKS_ACTION_TYPES.FETCH_STOCKS_UPDATE_SUCCESS, stocksArray);

export const fetchStocksUpdate = () => (dispatch) => {
  socket.on('ticker', (stocksArray, interval) => {
    dispatch(fetchStocksUpdateSuccess(stocksAndInterval(stocksArray, interval)));
  });
};

export const fetchStocksPause = () => {
  socket.emit('pause');
  return createAction(STOCKS_ACTION_TYPES.FETCH_STOCKS_PAUSE);
};

export const fetchStocksResume = () => {
  socket.emit('resume');
  return createAction(STOCKS_ACTION_TYPES.FETCH_STOCKS_RESUME);
};

export const setTickersInterval = (inputValue) => {
  const interval = checkInterval(inputValue);

  socket.emit('set interval', interval);
  return createAction(STOCKS_ACTION_TYPES.SET_TICKERS_INTERVAL, interval / 1000);
};

export const watchUnwatchTicker = (ticker) => {
  socket.emit('watch-unwatch', ticker);
  return createAction(STOCKS_ACTION_TYPES.WATCH_UNWATCH_TICKER);
};

export const fetchStocksFailure = (error) =>
  createAction(STOCKS_ACTION_TYPES.FETCH_STOCKS_FAILED, error);

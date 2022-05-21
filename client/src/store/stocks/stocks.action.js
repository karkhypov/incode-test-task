import { STOCKS_ACTION_TYPES } from './stocks.types';
import { createAction } from '../../utils/reducer/reducer.utils';

import socket from '../../connection/socket';

import { store } from '../store';

const checkIfGrowing = (stocks) => {
  const prevStocksData = store.getState().stocks.data;

  stocks.forEach((stock, index) => {
    const prevPrice = +prevStocksData[index].price;
    const curPrice = +stock.price;

    curPrice > prevPrice ? (stock.is_growing = true) : (stock.is_growing = false);
  });
};

const fetchStocksStart = () => (dispatch) => {
  try {
    socket.emit('start');
    return createAction(STOCKS_ACTION_TYPES.FETCH_STOCKS_START);
  } catch (error) {
    socket.disconnect();
    dispatch(fetchStocksFailure(error));
  }
};

const fetchStocksSuccess = (stocksArray) =>
  createAction(STOCKS_ACTION_TYPES.FETCH_STOCKS_SUCCESS, stocksArray);

const fetchStocksUpdateSuccess = (stocksArray) =>
  createAction(STOCKS_ACTION_TYPES.FETCH_STOCKS_UPDATE_SUCCESS, stocksArray);

const fetchStocksFailure = (error) =>
  createAction(STOCKS_ACTION_TYPES.FETCH_STOCKS_FAILED, error);

export const fetchStocks = () => (dispatch) => {
  dispatch(fetchStocksStart());

  try {
    socket.once('ticker', (response) => dispatch(fetchStocksSuccess(response)));
  } catch (error) {
    socket.disconnect();
    dispatch(fetchStocksFailure(error));
  }
};

export const fetchStocksUpdate = () => (dispatch) => {
  try {
    socket.on('ticker', (response) => {
      checkIfGrowing(response);
      dispatch(fetchStocksUpdateSuccess(response));
    });
  } catch (error) {
    socket.disconnect();
    dispatch(fetchStocksFailure(error));
  }
};

export const fetchStocksPause = () => {
  socket.disconnect();
  return createAction(STOCKS_ACTION_TYPES.FETCH_STOCKS_PAUSE);
};

export const fetchStocksResume = () => {
  socket.connect();
  socket.emit('start');
  return createAction(STOCKS_ACTION_TYPES.FETCH_STOCKS_RESUME);
};

export const setTickersInterval = (inputValue) => {
  const interval =
    (inputValue < 1 ? 1 : inputValue > 60 ? 60 : Math.round(inputValue)) * 1000;
  socket.emit('start', interval);
};

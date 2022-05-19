import { STOCKS_ACTION_TYPES } from './stocks.types';
import { createAction } from '../../utils/reducer/reducer.utils';

import socket from '../../connection/socket';

const fetchStocksStart = () => (dispatch) => {
  try {
    socket.emit('start');
    return createAction(STOCKS_ACTION_TYPES.FETCH_STOCKS_START);
  } catch (error) {
    socket.disconnect();
    dispatch(fetchStocksFailure(error));
  }
};

export const fetchStocksSuccess = (stocksArray) =>
  createAction(STOCKS_ACTION_TYPES.FETCH_STOCKS_SUCCESS, stocksArray);

export const fetchStocksUpdateSuccess = (stocksArray) =>
  createAction(STOCKS_ACTION_TYPES.FETCH_STOCKS_UPDATE_SUCCESS, stocksArray);

export const fetchStocksFailure = (error) =>
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
    socket.on('ticker', (response) => dispatch(fetchStocksUpdateSuccess(response)));
  } catch (error) {
    socket.disconnect();
    dispatch(fetchStocksFailure(error));
  }
};

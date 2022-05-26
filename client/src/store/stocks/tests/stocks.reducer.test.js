import { STOCKS_ACTION_TYPES } from '../stocks.types';
import { stocksReducer } from '../stocks.reducer';
import { createAction } from '../../../utils/reducer/reducer.utils';

import { mockInitialState } from '../../../utils/test/test.utils';
import * as mocks from '../../../utils/test/mock.data';

const initialState = mockInitialState.stocks;

describe('Stocks Reducer', () => {
  it('should return the initial state by default', () => {
    expect(stocksReducer(undefined)).toEqual(initialState);
  });

  it('should handle FETCH_STOCKS_START', () => {
    const action = createAction(STOCKS_ACTION_TYPES.FETCH_STOCKS_START);
    const result = {
      ...initialState,
      isLoading: true,
    };

    expect(stocksReducer(initialState, action)).toEqual(result);
  });

  it('should handle FETCH_STOCKS_SUCCESS', () => {
    const action = createAction(STOCKS_ACTION_TYPES.FETCH_STOCKS_SUCCESS, {
      stocksArray: mocks.mockInitialData,
      interval: 5,
    });
    const result = {
      ...initialState,
      stocksArray: mocks.mockInitialData,
      interval: 5,
      isLoading: false,
    };

    expect(stocksReducer(initialState, action)).toEqual(result);
  });

  describe('should handle FETCH_STOCKS_UPDATE_SUCCESS', () => {
    it('should check unfiltered data', () => {
      const state = { ...initialState, stocksArray: mocks.mockInitialData };
      const action = createAction(STOCKS_ACTION_TYPES.FETCH_STOCKS_UPDATE_SUCCESS, {
        stocksArray: mocks.mockUpdatedData,
        interval: 5,
      });
      const result = {
        ...state,
        stocksArray: mocks.mockUpdatedCheckedData,
        interval: 5,
      };

      expect(stocksReducer(state, action)).toEqual(result);
    });

    it('should filter checked data', () => {
      const state = {
        ...initialState,
        stocksArray: mocks.mockUpdatedCheckedData,
        interval: 5,
      };
      const action = createAction(STOCKS_ACTION_TYPES.FETCH_STOCKS_UPDATE_SUCCESS, {
        stocksArray: mocks.mockAgainUpdatedData,
        interval: 7,
      });
      const result = {
        ...state,
        stocksArray: mocks.mockAgainUpdatedCheckedAndFilteredData,
        interval: 7,
      };

      expect(stocksReducer(state, action)).toEqual(result);
    });
  });

  it('should handle FETCH_STOCKS_PAUSE', () => {
    const action = createAction(STOCKS_ACTION_TYPES.FETCH_STOCKS_PAUSE);
    const result = {
      ...initialState,
      isPaused: true,
    };

    expect(stocksReducer(initialState, action)).toEqual(result);
  });

  it('should handle FETCH_STOCKS_RESUME', () => {
    const state = { ...initialState, isPaused: true };
    const action = createAction(STOCKS_ACTION_TYPES.FETCH_STOCKS_RESUME);
    const result = {
      ...initialState,
      isPaused: false,
    };

    expect(stocksReducer(state, action)).toEqual(result);
  });

  it('should handle SET_TICKERS_INTERVAL', () => {
    const state = { ...initialState, interval: 5 };
    const action = createAction(STOCKS_ACTION_TYPES.SET_TICKERS_INTERVAL, 7);
    const result = {
      ...initialState,
      interval: 7,
    };

    expect(stocksReducer(state, action)).toEqual(result);
  });

  it('should handle WATCH_UNWATCH_TICKER', () => {
    const action = createAction(STOCKS_ACTION_TYPES.WATCH_UNWATCH_TICKER);
    const result = initialState;

    expect(stocksReducer(initialState, action)).toEqual(result);
  });

  it('should handle FETCH_STOCKS_FAILED', () => {
    const action = createAction(STOCKS_ACTION_TYPES.FETCH_STOCKS_FAILED, 'ERROR!');
    const result = { ...initialState, isLoading: false, error: 'ERROR!' };

    expect(stocksReducer(initialState, action)).toEqual(result);
  });
});

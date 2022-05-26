import { STOCKS_ACTION_TYPES } from '../stocks.types';
import * as actions from '../stocks.action';
import * as mocks from '../../../utils/test/mock.data';

describe('Stocks Reducer Actions', () => {
  it('should start stocks fetching', () => {
    const result = { type: STOCKS_ACTION_TYPES.FETCH_STOCKS_START, payload: undefined };

    expect(actions.fetchStocksStart()).toEqual(result);
  });

  it('should handle that stocks fetching was successful', () => {
    const input = mocks.mockInitialData;
    const result = {
      type: STOCKS_ACTION_TYPES.FETCH_STOCKS_SUCCESS,
      payload: mocks.mockInitialData,
    };

    expect(actions.fetchStocksSuccess(input)).toEqual(result);
  });

  it('should handle that stocks update fetching was successful', () => {
    const input = mocks.mockUpdatedData;
    const result = {
      type: STOCKS_ACTION_TYPES.FETCH_STOCKS_UPDATE_SUCCESS,
      payload: mocks.mockUpdatedData,
    };

    expect(actions.fetchStocksUpdateSuccess(input)).toEqual(result);
  });

  it('should handle pause', () => {
    const result = {
      type: STOCKS_ACTION_TYPES.FETCH_STOCKS_PAUSE,
      payload: undefined,
    };

    expect(actions.fetchStocksPause()).toEqual(result);
  });

  it('should handle resume', () => {
    const result = {
      type: STOCKS_ACTION_TYPES.FETCH_STOCKS_RESUME,
      payload: undefined,
    };

    expect(actions.fetchStocksResume()).toEqual(result);
  });

  describe('should handle tickers interval change', () => {
    it('should handle correct value', () => {
      const result = {
        type: STOCKS_ACTION_TYPES.SET_TICKERS_INTERVAL,
        payload: 5,
      };

      expect(actions.setTickersInterval(5)).toEqual(result);
    });

    it('should handle zero', () => {
      const result = {
        type: STOCKS_ACTION_TYPES.SET_TICKERS_INTERVAL,
        payload: 1,
      };

      expect(actions.setTickersInterval(0)).toEqual(result);
    });

    it('should handle negative value', () => {
      const result = {
        type: STOCKS_ACTION_TYPES.SET_TICKERS_INTERVAL,
        payload: 1,
      };

      expect(actions.setTickersInterval(-123)).toEqual(result);
    });

    it('should handle too big value', () => {
      const result = {
        type: STOCKS_ACTION_TYPES.SET_TICKERS_INTERVAL,
        payload: 60,
      };

      expect(actions.setTickersInterval(123)).toEqual(result);
    });

    it('should handle rounding down', () => {
      const result = {
        type: STOCKS_ACTION_TYPES.SET_TICKERS_INTERVAL,
        payload: 1,
      };

      expect(actions.setTickersInterval(1.2)).toEqual(result);
    });

    it('should handle rounding up', () => {
      const result = {
        type: STOCKS_ACTION_TYPES.SET_TICKERS_INTERVAL,
        payload: 2,
      };

      expect(actions.setTickersInterval(1.6)).toEqual(result);
    });
  });

  it('should handle fetch stocks failure', () => {
    const result = {
      type: STOCKS_ACTION_TYPES.FETCH_STOCKS_FAILED,
      payload: 'ERROR!',
    };

    expect(actions.fetchStocksFailure('ERROR!')).toEqual(result);
  });
});

import { STOCKS_ACTION_TYPES } from './stocks.types';

const INITIAL_STATE = {
  data: [],
  isLoading: 'initial',
  isPaused: false,
  interval: null,
  tickersToFilter: [],
  error: null,
};

export const stocksReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case STOCKS_ACTION_TYPES.FETCH_STOCKS_START:
      return { ...state, isLoading: true };

    case STOCKS_ACTION_TYPES.FETCH_STOCKS_SUCCESS:
      return {
        ...state,
        data: payload.data,
        interval: payload.interval,

        isLoading: false,
      };

    case STOCKS_ACTION_TYPES.FETCH_STOCKS_UPDATE_SUCCESS: {
      const newData = state.data.map((e) => {
        const x = payload.data.findIndex((k) => k.ticker === e.ticker);

        if (x === -1) {
          e.checked = false;
          return e;
        }

        return payload.data[x];
      });

      return {
        ...state,
        data: newData,
        interval: payload.interval,
      };
    }

    case STOCKS_ACTION_TYPES.FETCH_STOCKS_PAUSE:
      return { ...state, isPaused: true };

    case STOCKS_ACTION_TYPES.FETCH_STOCKS_RESUME:
      return { ...state, isPaused: false };

    case STOCKS_ACTION_TYPES.SET_TICKERS_INTERVAL:
      return { ...state, interval: payload };

    case STOCKS_ACTION_TYPES.WATCH_UNWATCH_TICKER:
      return state;

    case STOCKS_ACTION_TYPES.FETCH_STOCKS_FAILED:
      return { ...state, error: payload, isLoading: false };

    default:
      return state;
  }
};

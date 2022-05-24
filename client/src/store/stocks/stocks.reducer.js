import { STOCKS_ACTION_TYPES } from './stocks.types';

const INITIAL_STATE = {
  stocksArray: [],
  isLoading: 'initial',
  isPaused: false,
  interval: null,
  error: null,
};

const filterData = (state, newState) => {
  return state.stocksArray.map((prevStateStock) => {
    const stock = newState.stocksArray.findIndex(
      (newStateStock) => newStateStock.ticker === prevStateStock.ticker
    );

    if (stock === -1) {
      return prevStateStock;
    }

    return newState.stocksArray[stock];
  });
};

const checkIfGrowing = (state, stocksArray) => {
  const checked = [...stocksArray];
  const prevState = state.stocksArray;

  checked.forEach((stock, index) => {
    const prevPrice = +prevState[index].price;
    const curPrice = +stock.price;

    curPrice > prevPrice && (stock.is_growing = true);
    curPrice < prevPrice && (stock.is_growing = false);
  });

  return checked;
};

export const stocksReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case STOCKS_ACTION_TYPES.FETCH_STOCKS_START:
      return { ...state, isLoading: true };

    case STOCKS_ACTION_TYPES.FETCH_STOCKS_SUCCESS:
      return {
        ...state,
        stocksArray: payload.stocksArray,
        interval: payload.interval,
        isLoading: false,
      };

    case STOCKS_ACTION_TYPES.FETCH_STOCKS_UPDATE_SUCCESS: {
      const newData = filterData(state, payload);
      const checkedData = checkIfGrowing(state, newData);

      return {
        ...state,
        stocksArray: checkedData,
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

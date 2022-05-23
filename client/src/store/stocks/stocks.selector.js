import { createSelector } from 'reselect';

const selectStocksReducer = (state) => state.stocks;

export const selectStocksData = createSelector(
  [selectStocksReducer],
  (stocksSlice) => stocksSlice.stocksArray
);

export const selectStocksIsLoading = createSelector(
  [selectStocksReducer],
  (stocksSlice) => stocksSlice.isLoading
);

export const selectStocksIsPaused = createSelector(
  [selectStocksReducer],
  (stocksSlice) => stocksSlice.isPaused
);

export const selectTickersInterval = createSelector(
  [selectStocksReducer],
  (stocksSlice) => stocksSlice.interval
);

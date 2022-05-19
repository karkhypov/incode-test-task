import { createSelector } from 'reselect';

const selectStocksReducer = (state) => state.stocks;

export const selectStocksData = createSelector(
  [selectStocksReducer],
  (stocksSlice) => stocksSlice.data
);

export const selectStocksIsLoading = createSelector(
  [selectStocksReducer],
  (stocksSlice) => stocksSlice.isLoading
);

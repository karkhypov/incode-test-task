import { combineReducers } from 'redux';

import { stocksReducer } from './stocks/stocks.reducer';

export const rootReducer = combineReducers({
  stocks: stocksReducer,
});

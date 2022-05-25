import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { rootReducer as reducer } from '../../store/root-reducer';

export const mockInitialState = {
  stocks: {
    stocksArray: [],
    isLoading: 'initial',
    isPaused: false,
    interval: null,
    error: null,
  },
};

export const renderWithRedux = (
  component,
  { initialState = mockInitialState, store = createStore(reducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

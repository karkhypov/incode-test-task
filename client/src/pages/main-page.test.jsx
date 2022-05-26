import { screen } from '@testing-library/react';
// import { within } from '@testing-library/dom';

import { renderWithRedux } from '../utils/test/test.utils';
import { mockInitialData } from '../utils/test/mock.data';

import MainPage from './main-page.component';

describe('Main Page', () => {
  it('initially renders the spinner', () => {
    renderWithRedux(<MainPage />, {
      initialState: { stocks: { isLoading: 'initial' } },
    });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    expect(screen.queryByRole('table')).toBeNull();

    expect(screen.queryByText(/^tickers interval: 5 seconds$/i)).toBeNull();
    expect(screen.queryByLabelText(/^interval \(sec\)$/i)).toBeNull();
    expect(screen.queryByDisplayValue('')).toBeNull();
    expect(screen.queryByText(/submit/i)).toBeNull();

    expect(screen.queryByText(/pause/i)).toBeNull();
  });

  it('renders the spinner when loading state is true', () => {
    renderWithRedux(<MainPage />, {
      initialState: { stocks: { isLoading: true } },
    });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    expect(screen.queryByRole('table')).toBeNull();

    expect(screen.queryByText(/^tickers interval: 5 seconds$/i)).toBeNull();
    expect(screen.queryByLabelText(/^interval \(sec\)$/i)).toBeNull();
    expect(screen.queryByDisplayValue('')).toBeNull();
    expect(screen.queryByText(/submit/i)).toBeNull();

    expect(screen.queryByText(/pause/i)).toBeNull();
  });

  it('renders the components when loading state is false', () => {
    renderWithRedux(<MainPage />, {
      initialState: {
        stocks: { stocksArray: mockInitialData, interval: 5, isLoading: false },
      },
    });

    expect(screen.queryByRole('progressbar')).toBeNull();

    expect(screen.getByRole('table')).toBeInTheDocument();

    expect(screen.getByText(/^tickers interval: 5 seconds$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^interval \(sec\)$/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('')).toBeInTheDocument();

    const submitButton = screen.getByText(/submit/i);

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveStyle('backgroundColor: rgb(25, 118, 210)');

    const pauseResumeButton = screen.getByText(/pause/i);

    expect(pauseResumeButton).toBeInTheDocument();
    expect(pauseResumeButton).toHaveStyle('backgroundColor: rgb(211, 47, 47)');
  });
});

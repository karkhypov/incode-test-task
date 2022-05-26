import { screen } from '@testing-library/react';

import { renderWithRedux } from '../../utils/test/test.utils';

import IntervalTooltip from './interval-tooltip.component';

describe('Interval Tooltip', () => {
  it('initially renders the tooltip', () => {
    renderWithRedux(<IntervalTooltip />);
    expect(screen.getByText(/tickers interval/i)).toBeInTheDocument();
  });

  it('renders tooltip with an interval 1', () => {
    renderWithRedux(<IntervalTooltip />, {
      initialState: { stocks: { interval: 1 } },
    });
    expect(screen.getByText(/^tickers interval: 1 second$/i)).toBeInTheDocument();
  });

  it('renders tooltip with an interval greater than 1', () => {
    renderWithRedux(<IntervalTooltip />, {
      initialState: { stocks: { interval: 5 } },
    });
    expect(screen.getByText(/^tickers interval: 5 seconds$/i)).toBeInTheDocument();
  });
});

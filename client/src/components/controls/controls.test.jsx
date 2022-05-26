import { screen } from '@testing-library/react';

import { renderWithRedux } from '../../utils/test/test.utils';

import Controls from './controls.component';

describe('Controls Component', () => {
  it('initially renders the component correctly', () => {
    renderWithRedux(<Controls />, {
      initialState: { stocks: { interval: 5 } },
    });

    const pauseResumeButton = screen.getByText(/pause/i);

    expect(pauseResumeButton).toBeInTheDocument();
    expect(pauseResumeButton).toHaveStyle('backgroundColor: rgb(211, 47, 47)');

    expect(screen.getByText(/^tickers interval: 5 seconds$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^interval \(sec\)$/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('')).toBeInTheDocument();

    const submitButton = screen.getByText(/submit/i);

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveStyle('backgroundColor: rgb(25, 118, 210)');
  });
});

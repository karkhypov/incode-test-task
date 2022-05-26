import { screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { renderWithRedux } from '../../utils/test/test.utils';

import SetTickersInterval from './set-tickers-interval.component';

describe('Set Tickers Interval Component', () => {
  it('initially renders the component correctly', () => {
    renderWithRedux(<SetTickersInterval />, {
      initialState: { stocks: { interval: 5 } },
    });

    expect(screen.getByText(/^tickers interval: 5 seconds$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^interval \(sec\)$/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('')).toBeInTheDocument();

    const submitButton = screen.getByRole('button');

    expect(submitButton).toBeInTheDocument();
    expect(within(submitButton).getByText(/submit/i)).toBeInTheDocument();
    expect(submitButton).toHaveStyle('backgroundColor: rgb(25, 118, 210)');
  });

  it('handles a submit with an empty input field', () => {
    renderWithRedux(<SetTickersInterval />, {
      initialState: { stocks: { interval: 5 } },
    });

    const submitButton = screen.getByRole('button');

    userEvent.click(submitButton);
    expect(screen.getByText(/^tickers interval: 5 seconds$/i)).toBeInTheDocument();
  });

  it('allows the user to type in the input field', () => {
    renderWithRedux(<SetTickersInterval />, {
      initialState: { stocks: { interval: 5 } },
    });

    userEvent.type(screen.getByDisplayValue(''), '123');
    expect(screen.getByDisplayValue('123')).toBeInTheDocument();
  });

  it('allows the user to set the interval', () => {
    renderWithRedux(<SetTickersInterval />, {
      initialState: { stocks: { interval: 5 } },
    });

    expect(screen.getByText(/^tickers interval: 5 seconds$/i)).toBeInTheDocument();

    userEvent.type(screen.getByDisplayValue(''), '1');
    userEvent.click(screen.getByRole('button'));

    expect(screen.getByText(/^tickers interval: 1 second$/i)).toBeInTheDocument();
    expect(screen.queryByDisplayValue('1')).toBeNull();
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });

  it('handles exceptional input cases', () => {
    renderWithRedux(<SetTickersInterval />, {
      initialState: { stocks: { interval: 5 } },
    });

    expect(screen.getByText(/^tickers interval: 5 seconds$/i)).toBeInTheDocument();

    const input = screen.getByDisplayValue('');
    const submit = screen.getByRole('button');

    userEvent.type(input, 'some text');
    expect(screen.getByText(/^tickers interval: 5 seconds$/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('')).toBeInTheDocument();

    userEvent.type(input, '0');
    userEvent.click(submit);
    expect(screen.getByText(/^tickers interval: 1 second$/i)).toBeInTheDocument();

    userEvent.type(input, '-123');
    userEvent.click(submit);
    expect(screen.getByText(/^tickers interval: 1 second$/i)).toBeInTheDocument();

    userEvent.type(input, '123');
    userEvent.click(submit);
    expect(screen.getByText(/^tickers interval: 60 seconds$/i)).toBeInTheDocument();

    userEvent.type(input, '1.6');
    userEvent.click(submit);
    expect(screen.getByText(/^tickers interval: 2 seconds$/i)).toBeInTheDocument();

    userEvent.type(input, '1.2');
    userEvent.click(submit);
    expect(screen.getByText(/^tickers interval: 1 second$/i)).toBeInTheDocument();
  });
});

import { screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { renderWithRedux } from '../../utils/test/test.utils';

import PauseResumeButton from './pause-resume-button.component';

const pauseButtonStyles = () => 'backgroundColor: rgb(211, 47, 47)';
const resumeButtonStyles = () => 'backgroundColor: rgb(25, 118, 210)';

describe('Pause-Resume Button', () => {
  it('initially renders the button', () => {
    renderWithRedux(<PauseResumeButton />);

    const button = screen.getByRole('button');

    expect(button).toHaveStyle(pauseButtonStyles());
    expect(within(button).getByText(/pause/i)).toBeInTheDocument();
  });

  it('changes the button after clicking on it', () => {
    renderWithRedux(<PauseResumeButton />);

    const button = screen.getByRole('button');

    userEvent.click(button);
    expect(button).toHaveStyle(resumeButtonStyles());
    expect(within(button).getByText(/resume/i)).toBeInTheDocument();
  });

  it('changes the button after twice clicking on it', () => {
    renderWithRedux(<PauseResumeButton />);

    const button = screen.getByRole('button');

    expect(button).toHaveStyle(pauseButtonStyles());
    expect(within(button).getByText(/pause/i)).toBeInTheDocument();

    userEvent.click(button);
    expect(button).toHaveStyle(resumeButtonStyles());
    expect(within(button).getByText(/resume/i)).toBeInTheDocument();

    userEvent.click(button);
    expect(button).toHaveStyle(pauseButtonStyles());
    expect(within(button).getByText(/pause/i)).toBeInTheDocument();
  });
});

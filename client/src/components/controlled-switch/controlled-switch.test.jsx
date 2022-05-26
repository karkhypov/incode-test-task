import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRedux } from '../../utils/test/test.utils';

import ControlledSwitch from './controlled-switch.component';

describe('Controlled Switch', () => {
  it('initially renders the switch', () => {
    renderWithRedux(<ControlledSwitch />);

    const controlledSwitch = screen.getByRole('checkbox');

    expect(controlledSwitch).toBeInTheDocument();
    expect(controlledSwitch.checked).toEqual(true);
  });

  it('changes the state after clicking on it', () => {
    renderWithRedux(<ControlledSwitch />);

    const controlledSwitch = screen.getByRole('checkbox');

    expect(controlledSwitch.checked).toEqual(true);

    userEvent.click(controlledSwitch);
    expect(controlledSwitch.checked).toEqual(false);
  });

  it('changes the state after twice clicking on it', () => {
    renderWithRedux(<ControlledSwitch />);

    const controlledSwitch = screen.getByRole('checkbox');

    expect(controlledSwitch.checked).toEqual(true);

    userEvent.click(controlledSwitch);
    expect(controlledSwitch.checked).toEqual(false);

    userEvent.click(controlledSwitch);
    expect(controlledSwitch.checked).toEqual(true);
  });
});

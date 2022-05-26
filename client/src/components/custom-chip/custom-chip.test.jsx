import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';

import CustomChip, { CUSTOM_CHIP_TYPE_CLASSES } from './custom-chip.component';

const dummyValue = 123;
const mockCustomChipProps = {
  initial: {
    type: CUSTOM_CHIP_TYPE_CLASSES.initial,
    value: 'n/a',
  },
  changeUp: { type: CUSTOM_CHIP_TYPE_CLASSES.changeUp, value: dummyValue },
  changeDown: { type: CUSTOM_CHIP_TYPE_CLASSES.changeDown, value: dummyValue },
  changePercentUp: { type: CUSTOM_CHIP_TYPE_CLASSES.changePercentUp, value: dummyValue },
  changePercentDown: {
    type: CUSTOM_CHIP_TYPE_CLASSES.changePercentDown,
    value: dummyValue,
  },
};

describe('Custom Chip', () => {
  it('initially renders the custom chip', () => {
    render(<CustomChip {...mockCustomChipProps.initial} />);

    expect(screen.getByText(/n\/a/i)).toBeInTheDocument();
  });

  it('renders the increased price change', () => {
    render(<CustomChip {...mockCustomChipProps.changeUp} />);

    const increasedPrice = screen.getByText(/\+123/i);

    expect(increasedPrice).toBeInTheDocument();
    expect(increasedPrice).toHaveStyle('color: green');
  });

  it('renders the decreased price change', () => {
    render(<CustomChip {...mockCustomChipProps.changeDown} />);

    const decreasedPrice = screen.getByText(/-123/i);

    expect(decreasedPrice).toBeInTheDocument();
    expect(decreasedPrice).toHaveStyle('color: red');
  });

  it('renders the increased price percentage change', () => {
    render(<CustomChip {...mockCustomChipProps.changePercentUp} />);

    const increasedPricePercentage = screen.getByText(/123%/i);

    expect(increasedPricePercentage).toBeInTheDocument();
    expect(increasedPricePercentage).toHaveStyle('color: green');

    expect(within(increasedPricePercentage).getByText('↑')).toBeInTheDocument();
  });

  it('renders the decreased price percentage change', () => {
    render(<CustomChip {...mockCustomChipProps.changePercentDown} />);

    const decreasedPricePercentage = screen.getByText(/123%/i);

    expect(decreasedPricePercentage).toBeInTheDocument();
    expect(decreasedPricePercentage).toHaveStyle('color: red');

    expect(within(decreasedPricePercentage).getByText('↓')).toBeInTheDocument();
  });
});

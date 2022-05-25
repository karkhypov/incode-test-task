import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';

import CustomTableHead from './custom-table-head';

describe('Custom Table Head', () => {
  it('renders table header, row and all columns correctly', () => {
    render(<CustomTableHead />);

    const tableHeader = screen.getByRole('rowgroup');
    expect(tableHeader).toBeInTheDocument();

    const tableRow = within(tableHeader).getByRole('row');
    expect(tableRow).toBeInTheDocument();

    const tableColumns = within(tableRow).getAllByRole('columnheader');
    expect(tableColumns.length).toBe(9);
  });

  it('renders all columns headers correctly', () => {
    render(<CustomTableHead />);

    expect(screen.getByText(/ticker/i)).toBeInTheDocument();
    expect(screen.getByText(/price/i)).toBeInTheDocument();
    expect(screen.getByText(/^change$/i)).toBeInTheDocument();
    expect(screen.getByText(/^change percent$/i)).toBeInTheDocument();
    expect(screen.getByText(/dividend/i)).toBeInTheDocument();
    expect(screen.getByText(/yield/i)).toBeInTheDocument();
    expect(screen.getByText(/^last trade time$/i)).toBeInTheDocument();
    expect(screen.getByText(/on\/off/i)).toBeInTheDocument();
  });
});

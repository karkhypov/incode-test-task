import { screen } from '@testing-library/react';
import { within } from '@testing-library/dom';

import { renderWithRedux } from '../../../utils/test/test.utils';
import { mockInitialData } from '../../../utils/test/mock.data';

import StockTableBody from './stock-table-body.component';

describe('Stock Table Body', () => {
  it('initially renders the component correctly', () => {
    renderWithRedux(
      <table>
        <StockTableBody />
      </table>,
      { initialState: { stocks: { stocksArray: mockInitialData } } }
    );

    const rowGroup = screen.getByRole('rowgroup');

    expect(rowGroup).toBeInTheDocument();
    expect(within(rowGroup).getAllByRole('row').length).toBe(6);
    expect(within(rowGroup).getAllByRole('rowheader').length).toBe(6);
    expect(within(rowGroup).getAllByRole('cell').length).toBe(48);
    expect(within(rowGroup).getAllByRole('checkbox').length).toBe(6);
  });
});

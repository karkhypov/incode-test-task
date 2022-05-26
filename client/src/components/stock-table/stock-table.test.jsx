import { screen } from '@testing-library/react';

import { renderWithRedux } from '../../utils/test/test.utils';
import { mockInitialData } from '../../utils/test/mock.data';

import StockTable from './stock-table.component';

describe('Stock Table', () => {
  it('initially renders the component correctly', () => {
    renderWithRedux(<StockTable />, {
      initialState: { stocks: { stocksArray: mockInitialData } },
    });

    expect(screen.getAllByRole('rowgroup').length).toBe(2);
  });
});

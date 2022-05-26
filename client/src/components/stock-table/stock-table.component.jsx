import { Table, TableContainer, Paper } from '@mui/material';

import StockTableHead from './stock-table-head/stock-table-head.component';
import StockTableBody from './stock-table-body/stock-table-body.component';

const StockTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='data table'>
        <StockTableHead />
        <StockTableBody />
      </Table>
    </TableContainer>
  );
};

export default StockTable;

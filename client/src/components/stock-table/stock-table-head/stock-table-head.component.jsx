import { TableHead } from '@mui/material';

import { StyledTableCell, StyledTableRow } from '../stock-table.styles';

const StockTableHead = () => {
  return (
    <TableHead sx={{ margin: '100px' }}>
      <StyledTableRow>
        <StyledTableCell>Ticker</StyledTableCell>
        <StyledTableCell align='right'>Exchange</StyledTableCell>
        <StyledTableCell align='right'>Price</StyledTableCell>
        <StyledTableCell align='right'>Change</StyledTableCell>
        <StyledTableCell align='right'>Change Percent</StyledTableCell>
        <StyledTableCell align='right'>Dividend</StyledTableCell>
        <StyledTableCell align='right'>Yield</StyledTableCell>
        <StyledTableCell align='right'>Last Trade Time</StyledTableCell>
        <StyledTableCell align='right'>On/Off</StyledTableCell>
      </StyledTableRow>
    </TableHead>
  );
};

export default StockTableHead;

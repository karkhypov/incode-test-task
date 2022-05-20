import { useSelector } from 'react-redux';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

import { selectStocksData } from '../store/stocks/stocks.selector';

const createData = (
  ticker,
  exchange,
  price,
  change,
  change_percent,
  dividend,
  income,
  last_trade_time
) => {
  return {
    ticker,
    exchange,
    price,
    change,
    change_percent,
    dividend,
    income,
    last_trade_time,
  };
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const growVisualization = (value) => {
  switch (value) {
    case 'up':
      return { color: 'green' };
    case 'down':
      return { color: 'red' };
    case 'same':
      return {};
    default:
      return;
  }
};

const StockTable = ({ data }) => {
  const rows = data.map((element) => createData(...Object.values(element)));
  const stocksData = useSelector(selectStocksData);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='data table'>
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
        <TableBody>
          {rows.map((row, index) => {
            const isGrowing = stocksData[index].is_growing;

            return (
              <StyledTableRow
                key={row.ticker}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component='th' scope='row'>
                  {row.ticker}
                </StyledTableCell>
                <StyledTableCell align='right'>{row.exchange}</StyledTableCell>
                <StyledTableCell align='right'>{row.price}</StyledTableCell>
                <StyledTableCell sx={growVisualization(isGrowing)} align='right'>
                  {row.change}
                </StyledTableCell>
                <StyledTableCell sx={growVisualization(isGrowing)} align='right'>
                  {row.change_percent} &#x25;
                </StyledTableCell>
                <StyledTableCell align='right'>{row.dividend}</StyledTableCell>
                <StyledTableCell align='right'>{row.income}</StyledTableCell>
                <StyledTableCell align='right'>
                  {row.last_trade_time.slice(11, 19)}
                </StyledTableCell>
                <StyledTableCell align='right' sx={{ padding: '11px' }}>
                  <Switch defaultChecked />
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StockTable;

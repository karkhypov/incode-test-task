import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

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

const BasicTable = ({ data }) => {
  const rows = data.map((element) => createData(...Object.values(element)));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Ticker</TableCell>
            <TableCell align='right'>Exchange</TableCell>
            <TableCell align='right'>Price</TableCell>
            <TableCell align='right'>Change</TableCell>
            <TableCell align='right'>Change %</TableCell>
            <TableCell align='right'>Dividend</TableCell>
            <TableCell align='right'>Yield</TableCell>
            <TableCell align='right'>Last Trade Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.ticker}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row.ticker}
              </TableCell>
              <TableCell align='right'>{row.exchange}</TableCell>
              <TableCell align='right'>{row.price}</TableCell>
              <TableCell align='right'>{row.change}</TableCell>
              <TableCell align='right'>{row.change_percent}</TableCell>
              <TableCell align='right'>{row.dividend}</TableCell>
              <TableCell align='right'>{row.income}</TableCell>
              <TableCell align='right'>{row.last_trade_time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;

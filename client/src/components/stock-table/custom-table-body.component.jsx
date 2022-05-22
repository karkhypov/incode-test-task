import React from 'react';
import { useSelector } from 'react-redux';

import { TableBody } from '@mui/material';
import ControlledSwitch from '../controlled-switch.component';
import CustomChip, { CUSTOM_CHIP_TYPE_CLASSES } from '../custom-chip.component';

import { StyledTableCell, StyledTableRow } from './custom-table.styles';

import { selectStocksData } from '../../store/stocks/stocks.selector';

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

const CustomTableBody = () => {
  const stocksData = useSelector(selectStocksData);
  const rows = stocksData.map((element) => createData(...Object.values(element)));

  return (
    <TableBody>
      {rows.map((row, index) => {
        const isGrowing = stocksData[index].is_growing;
        const ticker = stocksData[index].ticker;

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
            <StyledTableCell align='right'>
              <CustomChip
                type={
                  isGrowing === undefined
                    ? CUSTOM_CHIP_TYPE_CLASSES.initial
                    : isGrowing
                    ? CUSTOM_CHIP_TYPE_CLASSES.changeUp
                    : CUSTOM_CHIP_TYPE_CLASSES.changeDown
                }
                value={row.change}
              />
            </StyledTableCell>
            <StyledTableCell align='right'>
              <CustomChip
                type={
                  isGrowing === undefined
                    ? CUSTOM_CHIP_TYPE_CLASSES.initial
                    : isGrowing
                    ? CUSTOM_CHIP_TYPE_CLASSES.changePercentUp
                    : CUSTOM_CHIP_TYPE_CLASSES.changePercentDown
                }
                value={row.change_percent}
              />
            </StyledTableCell>
            <StyledTableCell align='right'>{row.dividend}</StyledTableCell>
            <StyledTableCell align='right'>{row.income}</StyledTableCell>
            <StyledTableCell align='right'>
              {row.last_trade_time.slice(11, 19)}
            </StyledTableCell>
            <StyledTableCell align='right' sx={{ padding: '11px' }}>
              <ControlledSwitch ticker={ticker} />
            </StyledTableCell>
          </StyledTableRow>
        );
      })}
    </TableBody>
  );
};

export default CustomTableBody;

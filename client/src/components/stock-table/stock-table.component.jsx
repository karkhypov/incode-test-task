import { useSelector } from 'react-redux';

import { CircularProgress } from '@mui/material';

import CustomTable from './custom-table.component';

import { selectStocksIsLoading } from '../../store/stocks/stocks.selector';

const StockTable = () => {
  const isLoading = useSelector(selectStocksIsLoading);

  return isLoading || isLoading === 'initial' ? <CircularProgress /> : <CustomTable />;
};

export default StockTable;

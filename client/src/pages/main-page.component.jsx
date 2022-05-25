import { useSelector } from 'react-redux';

import { Container } from '@mui/system';
import { Grid } from '@mui/material';
import { CircularProgress } from '@mui/material';

import Controls from '../components/controls.component';
import StockTable from '../components/stock-table/stock-table.component';

import { selectStocksIsLoading } from '../store/stocks/stocks.selector';

const MainPage = () => {
  const isLoading = useSelector(selectStocksIsLoading);

  return (
    <Container>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        sx={{ minHeight: '95vh' }}
      >
        {isLoading || isLoading === 'initial' ? (
          <CircularProgress />
        ) : (
          <>
            <StockTable />
            <Controls />
          </>
        )}
      </Grid>
    </Container>
  );
};

export default MainPage;

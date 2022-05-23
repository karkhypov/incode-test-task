import { useSelector } from 'react-redux';

import { Container } from '@mui/system';
import { Grid } from '@mui/material';
import { CircularProgress } from '@mui/material';

import Controls from '../components/controls.component';
import CustomTable from '../components/stock-table/custom-table.component';

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
            <CustomTable />
            <Controls />
          </>
        )}
      </Grid>
    </Container>
  );
};

export default MainPage;

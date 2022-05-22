import { Container } from '@mui/system';
import { Grid } from '@mui/material';

import Controls from '../components/controls.component';
import CustomTable from '../components/stock-table/custom-table.component';

const MainPage = () => {
  return (
    <Container>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        sx={{ minHeight: '100vh' }}
      >
        <CustomTable />
        <Controls />
      </Grid>
    </Container>
  );
};

export default MainPage;

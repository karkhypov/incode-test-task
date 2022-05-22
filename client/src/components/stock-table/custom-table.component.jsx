import { Table, TableContainer, Paper } from '@mui/material';

import CustomTableBody from './custom-table-body.component';
import CustomTableHead from './custom-table-head';

const CustomTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='data table'>
        <CustomTableHead />
        <CustomTableBody />
      </Table>
    </TableContainer>
  );
};

export default CustomTable;

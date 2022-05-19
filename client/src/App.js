import { useEffect, useState } from 'react';

import socket from './socket';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container } from '@mui/system';
import { Grid } from '@mui/material';
import { CircularProgress } from '@mui/material';

import './App.css';

import BasicTable from './components/basic-table.component';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    socket.emit('start');
  }, []);

  const handleTicker = (response) => {
    setData(response);
  };

  useEffect(() => {
    socket.on('ticker', (response) => handleTicker(response));
    return () => {
      socket.off('ticker');
    };
  }, [data]);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Container>
          <Grid
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{ minHeight: '100vh' }}
          >
            {data.length === 0 ? <CircularProgress /> : <BasicTable data={data} />}
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;

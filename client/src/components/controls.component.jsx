import { Box } from '@mui/material';

import PauseResumeButton from './pause-resume-button/pause-resume-button.component';
import SetTickersInterval from './set-tickers-interval.component';

const Controls = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mt: 2,
        width: 400,
      }}
    >
      <SetTickersInterval />
      <PauseResumeButton />
    </Box>
  );
};

export default Controls;

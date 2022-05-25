import { Typography } from '@mui/material';

export const CUSTOM_CHIP_TYPE_CLASSES = {
  initial: 'initial',
  changeUp: 'changeUp',
  changeDown: 'changeDown',
  changePercentUp: 'changePercentUp',
  changePercentDown: 'changePercentDown',
};

const arrowStyles = {
  fontSize: '25px',
  lineHeight: 0,
  marginRight: '3px',
};

const textStyles = { fontSize: 18, width: 66, marginLeft: 'auto' };
const up = { ...textStyles, color: 'green' };
const down = { ...textStyles, color: 'red' };

const CustomChip = ({ type, value }) => {
  switch (type) {
    case CUSTOM_CHIP_TYPE_CLASSES.changeUp:
      return <Typography sx={up}>+{value}</Typography>;

    case CUSTOM_CHIP_TYPE_CLASSES.changeDown:
      return <Typography sx={down}>-{value}</Typography>;

    case CUSTOM_CHIP_TYPE_CLASSES.changePercentUp:
      return (
        <Typography sx={up}>
          <Typography variant='paragraph' sx={arrowStyles}>
            ↑
          </Typography>
          {value}%
        </Typography>
      );

    case CUSTOM_CHIP_TYPE_CLASSES.changePercentDown:
      return (
        <Typography sx={down}>
          <Typography variant='paragraph' sx={arrowStyles}>
            ↓
          </Typography>
          {value}%
        </Typography>
      );

    case CUSTOM_CHIP_TYPE_CLASSES.initial:
      return <Typography sx={{ ...textStyles, minWidth: '100%' }}>{value}</Typography>;

    default:
      return;
  }
};

export default CustomChip;

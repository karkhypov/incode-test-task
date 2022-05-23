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
const up = { color: 'green', ...textStyles };
const down = { color: 'red', ...textStyles };

const CustomChip = ({ type, value }) => {
  switch (type) {
    case CUSTOM_CHIP_TYPE_CLASSES.changeUp:
      return <Typography sx={up}>&#43;{value}</Typography>;

    case CUSTOM_CHIP_TYPE_CLASSES.changeDown:
      return <Typography sx={down}>&#8722;{value}</Typography>;

    case CUSTOM_CHIP_TYPE_CLASSES.changePercentUp:
      return (
        <Typography sx={up}>
          <Typography variant='paragraph' sx={arrowStyles}>
            &#8593;
          </Typography>
          {value}&#37;
        </Typography>
      );

    case CUSTOM_CHIP_TYPE_CLASSES.changePercentDown:
      return (
        <Typography sx={down}>
          <Typography variant='paragraph' sx={arrowStyles}>
            &#8595;
          </Typography>
          {value}&#37;
        </Typography>
      );

    case CUSTOM_CHIP_TYPE_CLASSES.initial:
      return <Typography sx={{ minWidth: '100%', ...textStyles }}>{value}</Typography>;

    default:
      return;
  }
};

export default CustomChip;

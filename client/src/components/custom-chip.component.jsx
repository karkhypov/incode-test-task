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

const CustomChip = ({ type, value }) => {
  switch (type) {
    case CUSTOM_CHIP_TYPE_CLASSES.changeUp:
      return <Typography sx={{ color: 'green', ...textStyles }}>&#43;{value}</Typography>;

    case CUSTOM_CHIP_TYPE_CLASSES.changeDown:
      return <Typography sx={{ color: 'red', ...textStyles }}>&#8722;{value}</Typography>;

    case CUSTOM_CHIP_TYPE_CLASSES.changePercentUp:
      return (
        <Typography sx={{ color: 'green', ...textStyles }}>
          <span style={arrowStyles}>&#8593;</span>
          {value}&#37;
        </Typography>
      );

    case CUSTOM_CHIP_TYPE_CLASSES.changePercentDown:
      return (
        <Typography sx={{ color: 'red', ...textStyles }}>
          <span style={arrowStyles}>&#8595;</span>
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

import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import React from 'react';

const TooltipItem = ({ children, ...rest }: TooltipProps) => (
  <Tooltip {...rest}>
    <span children={children} />
  </Tooltip>
);
export default TooltipItem;

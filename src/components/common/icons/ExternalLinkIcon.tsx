import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import React from 'react';
import External from './external.svg';

const ExternalLinkIcon = (props: SvgIconProps) => <SvgIcon {...props} component={External} viewBox="0 0 128 128" />;
export default ExternalLinkIcon;

import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import React from 'react';
import Contract from './contract.svg';

const ContractIcon = (props: SvgIconProps) => <SvgIcon {...props} component={Contract} viewBox="0 0 512 512" />;
export default ContractIcon;

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import { SvgIconProps } from '@mui/material/SvgIcon';
import React from 'react';

interface AccountIconProps extends SvgIconProps {
  circle?: boolean;
}

const AccountIcon = ({ circle, ...rest }: AccountIconProps) =>
  circle ? <AccountCircleIcon {...rest} /> : <PersonIcon {...rest} />;
export default AccountIcon;

import { SvgIconProps } from '@mui/material/SvgIcon';
import CheckCircle from '@mui/icons-material/CheckCircle';
import React from 'react';
import Sync from '@mui/icons-material/Sync';
import TooltipItem from '../common/typography/TooltipItem';
import { TransactionStatus } from './transactionHooks';

export interface TransactionStatusIconProps extends SvgIconProps {
  transactionStatus: TransactionStatus;
}

const TransactionStatusIcon = ({ transactionStatus, ...rest }: TransactionStatusIconProps) =>
  transactionStatus === TransactionStatus.Confirmed ? (
    <TooltipItem title="Transaction Confirmed">
      <CheckCircle {...rest} />
    </TooltipItem>
  ) : (
    <TooltipItem title="Transaction in progress">
      <Sync {...rest} />
    </TooltipItem>
  );
export default TransactionStatusIcon;

import React from 'react';
import { useWallet } from '../../hooks/wallet';
import DetailValue from '../common/typography/DetailValue';
import ExternalLink, { ExternalLinkProps } from '../common/typography/ExternalLink';
import { TransactionStatus } from './transactionHooks';
import TransactionStatusIcon from './TransactionStatusIcon';

interface TransactionLinkProps extends Omit<ExternalLinkProps, 'href'> {
  transactionHash: string;
  transactionStatus: TransactionStatus;
}

const TransactionLink = ({ transactionHash, transactionStatus, onClick, ...rest }: TransactionLinkProps) => {
  const { wallet } = useWallet();
  const blockExplorerUrl = wallet?.network.blockExplorerUrls[0];

  if (!blockExplorerUrl) {
    return (
      <DetailValue onClick={onClick}>
        {transactionHash}
        &nbsp;
        <TransactionStatusIcon transactionStatus={transactionStatus} fontSize="small" />
      </DetailValue>
    );
  }

  return (
    <ExternalLink
      {...rest}
      href={`${blockExplorerUrl}/tx/${transactionHash}`}
      onClick={
        onClick
          ? onClick
          : (event) => {
              event.stopPropagation();
            }
      }
    >
      {transactionHash}
      &nbsp;
      <TransactionStatusIcon transactionStatus={transactionStatus} fontSize="small" />
    </ExternalLink>
  );
};
export default TransactionLink;

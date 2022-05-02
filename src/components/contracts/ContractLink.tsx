import React from 'react';
import { useWallet } from '../../hooks/wallet';
import DetailValue from '../common/typography/DetailValue';
import ExternalLink, { ExternalLinkProps } from '../common/typography/ExternalLink';

interface ContractLinkProps extends Omit<ExternalLinkProps, 'href'> {
  address: string;
}

const ContractLink = ({ address, onClick, ...rest }: ContractLinkProps) => {
  const { wallet } = useWallet();
  const blockExplorerUrl = wallet?.network.blockExplorerUrls[0];

  if (!blockExplorerUrl) {
    return <DetailValue onClick={onClick}>{address}</DetailValue>;
  }

  return (
    <ExternalLink
      {...rest}
      href={`${blockExplorerUrl}/address/${address}`}
      onClick={
        onClick
          ? onClick
          : (event) => {
              event.stopPropagation();
            }
      }
    >
      {address}
    </ExternalLink>
  );
};
export default ContractLink;

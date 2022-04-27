import React from 'react';
import DetailValue from '../common/typography/DetailValue';
import ExternalLink, { ExternalLinkProps } from '../common/typography/ExternalLink';

interface ContractLinkProps extends Omit<ExternalLinkProps, 'href'> {
  address: string;
  blockExplorerUrl?: string | null;
}

const ContractLink = ({ address, blockExplorerUrl, onClick, ...rest }: ContractLinkProps) => {
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

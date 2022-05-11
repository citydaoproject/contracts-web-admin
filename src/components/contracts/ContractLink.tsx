import React from 'react';
import { useWallet } from '../../hooks/wallet';
import CopyToClipboard from '../common/actions/CopyToClipboard';
import DetailValue from '../common/typography/DetailValue';
import ExternalLink, { ExternalLinkProps } from '../common/typography/ExternalLink';

interface ContractLinkProps extends Omit<ExternalLinkProps, 'href'> {
  address: string;
}

const ContractLink = ({ address, onClick, ...rest }: ContractLinkProps) => {
  const { wallet } = useWallet();
  const blockExplorerUrl = wallet?.network.blockExplorerUrls[0];

  if (!blockExplorerUrl) {
    return (
      <>
        <DetailValue onClick={onClick}>{address}</DetailValue>
        <CopyToClipboard text={address} />
      </>
    );
  }

  return (
    <>
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
      <CopyToClipboard text={address} />
    </>
  );
};
export default ContractLink;

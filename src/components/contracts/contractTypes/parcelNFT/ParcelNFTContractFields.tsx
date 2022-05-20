import { ParcelNFT__factory } from '@citydao/parcel-contracts/dist/types/contracts/factories/ParcelNFT__factory';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import React from 'react';
import ExpandIcon from '../../../common/actions/ExpandIcon';
import DetailField from '../../../common/typography/DetailField';
import DetailTitle from '../../../common/typography/DetailTitle';
import DetailValue from '../../../common/typography/DetailValue';
import { useExecuteTransaction } from '../../../transactions/transactionHooks';
import { useContractLoader } from '../../contractHooks';
import { LogicContractType } from '../../logicContracts';
import PauseContract from '../../PauseContract';
import UpgradeContract from '../../UpgradeContract';
import BaseURIEditor from './BaseURIEditor';
import ClaimPeriodEditor from './ClaimPeriodEditor';
import DefaultRoyaltyEditor from './DefaultRoyaltyEditor';
import MerkleRootEditor from './MerkleRootEditor';
import OwnerEditor from './OwnerEditor';
import TokenRoyaltyEditor from './TokenRoyaltyEditor';
import TokenURIEditor from './TokenURIEditor';

export interface ParcelNFTContractFieldsProps {
  address: string;
}

const ParcelNFTContractFields = ({ address }: ParcelNFTContractFieldsProps) => {
  const {
    contract: parcelNFT,
    values,
    refetch,
  } = useContractLoader(new ParcelNFT__factory(), address, ['name', 'symbol', 'baseURI', 'merkleRoot', 'owner']);

  const { execute } = useExecuteTransaction();

  if (!values || !parcelNFT) {
    return <em>Loading ParcelNFT Fields...</em>;
  }

  const handlePause = async () => Boolean(await execute(await parcelNFT.populateTransaction.pause()));

  const handleResume = async () => Boolean(await execute(await parcelNFT.populateTransaction.unpause()));

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandIcon />}>
          {values.name || '(no name)'} {values.symbol ? `(${values.symbol})` : ''}{' '}
        </AccordionSummary>
        <AccordionDetails>
          <DetailField>
            <DetailTitle>Name</DetailTitle>
            <DetailValue>{values.name}</DetailValue>
          </DetailField>
          <DetailField>
            <DetailTitle>Symbol</DetailTitle>
            <DetailValue>{values.symbol}</DetailValue>
          </DetailField>
          <PauseContract pauseableContractAddress={address} onPause={handlePause} onResume={handleResume} />
          <BaseURIEditor parcelNFT={parcelNFT} baseURI={values.baseURI || ''} onChange={refetch} />
          <TokenURIEditor parcelNFT={parcelNFT} />
          <ClaimPeriodEditor parcelNFT={parcelNFT} />
          <MerkleRootEditor parcelNFT={parcelNFT} merkleRoot={values.merkleRoot || ''} onChange={refetch} />
          <DefaultRoyaltyEditor parcelNFT={parcelNFT} />
          <TokenRoyaltyEditor parcelNFT={parcelNFT} />
          {values.owner ? <OwnerEditor parcelNFT={parcelNFT} owner={values.owner} onChange={refetch} /> : null}
          <UpgradeContract proxyContractAddress={address} type={LogicContractType.ParcelNFT} onUpgrade={refetch} />
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export default ParcelNFTContractFields;

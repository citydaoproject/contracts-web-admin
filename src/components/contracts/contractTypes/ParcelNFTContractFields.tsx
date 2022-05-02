import { ParcelNFT__factory } from '@citydao/parcel-contracts/dist/types/contracts/factories/ParcelNFT__factory';
import React from 'react';
import DetailField from '../../common/typography/DetailField';
import DetailTitle from '../../common/typography/DetailTitle';
import DetailValue from '../../common/typography/DetailValue';
import { useContractLoader } from '../contractHooks';

export interface ParcelNFTContractFieldsProps {
  address: string;
}

const ParcelNFTContractFields = ({ address }: ParcelNFTContractFieldsProps) => {
  const { values } = useContractLoader(new ParcelNFT__factory(), address, ['name', 'symbol']);

  if (!values) {
    return <div>Loading ParcelNFT Fields</div>;
  }

  return (
    <>
      <DetailField>
        <DetailTitle>Name</DetailTitle>
        <DetailValue>{values.name}</DetailValue>
      </DetailField>
      <DetailField>
        <DetailTitle>Symbol</DetailTitle>
        <DetailValue>{values.symbol}</DetailValue>
      </DetailField>
    </>
  );
};
export default ParcelNFTContractFields;

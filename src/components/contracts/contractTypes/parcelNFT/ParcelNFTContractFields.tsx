import { ParcelNFT__factory } from '@citydao/parcel-contracts/dist/types/contracts/factories/ParcelNFT__factory';
import React from 'react';
import DetailField from '../../../common/typography/DetailField';
import DetailTitle from '../../../common/typography/DetailTitle';
import DetailValue from '../../../common/typography/DetailValue';
import { useContractLoader } from '../../contractHooks';
import BaseURIEditor from './BaseURIEditor';
import TokenURIEditor from './TokenURIEditor';

export interface ParcelNFTContractFieldsProps {
  address: string;
}

const ParcelNFTContractFields = ({ address }: ParcelNFTContractFieldsProps) => {
  const {
    contract: parcelNFT,
    values,
    refetch,
  } = useContractLoader(new ParcelNFT__factory(), address, ['name', 'symbol', 'baseURI']);

  if (!values || !parcelNFT) {
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
      <BaseURIEditor parcelNFT={parcelNFT} baseURI={values.baseURI} onChange={refetch} />
      <TokenURIEditor parcelNFT={parcelNFT} />
    </>
  );
};
export default ParcelNFTContractFields;

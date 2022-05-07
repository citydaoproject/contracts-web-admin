import { ParcelNFT__factory } from '@citydao/parcel-contracts/dist/types/contracts/factories/ParcelNFT__factory';
import React from 'react';
import { useFormFields } from '../../../hooks/forms';
import DefaultButton from '../../common/forms/DefaultButton';
import DefaultTextField from '../../common/forms/DefaultTextField';
import DetailField from '../../common/typography/DetailField';
import DetailTitle from '../../common/typography/DetailTitle';
import DetailValue from '../../common/typography/DetailValue';
import { useExecuteTransaction } from '../../transactions/transactionHooks';
import { useContractLoader } from '../contractHooks';

export interface ParcelNFTContractFieldsProps {
  address: string;
}

interface ParcelNFTFormFields {
  newBaseURI: string;
}

const ParcelNFTContractFields = ({ address }: ParcelNFTContractFieldsProps) => {
  const {
    values,
    refetch,
    contract: parcelNFT,
  } = useContractLoader(new ParcelNFT__factory(), address, ['name', 'symbol', 'baseURI']);
  const { fields, handleFieldChange, resetFields } = useFormFields<ParcelNFTFormFields>({ newBaseURI: '' });

  const { execute, executing } = useExecuteTransaction();

  if (!values) {
    return <div>Loading ParcelNFT Fields</div>;
  }

  const handleSetBaseURI = async () => {
    if (!parcelNFT) {
      console.warn('Parcel NFT Contract not loaded');
      return;
    }

    if (!(await execute(await parcelNFT.populateTransaction.setBaseURI(fields.newBaseURI)))) {
      return;
    }

    resetFields();

    await refetch();
  };

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
      <DetailField>
        <DetailTitle>Base URI</DetailTitle>
        <DetailValue>{values.baseURI}</DetailValue>
        <DefaultTextField
          name="newBaseURI"
          type="text"
          label="New Base URI"
          autoComplete="off"
          value={fields.newBaseURI}
          required
          onChange={handleFieldChange}
        />
        <DefaultButton disabled={executing} onClick={handleSetBaseURI}>
          Update Base URI
        </DefaultButton>
      </DetailField>
    </>
  );
};
export default ParcelNFTContractFields;

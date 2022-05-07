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
  newTokenURI: string;
  newTokenURITokenId: string;
}

const ParcelNFTContractFields = ({ address }: ParcelNFTContractFieldsProps) => {
  const {
    values,
    refetch,
    contract: parcelNFT,
  } = useContractLoader(new ParcelNFT__factory(), address, ['name', 'symbol', 'baseURI']);

  const { fields, handleFieldChange, setFieldValue } = useFormFields<ParcelNFTFormFields>({
    newBaseURI: '',
    newTokenURI: '',
    newTokenURITokenId: '',
  });

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

    await refetch();

    setFieldValue('newBaseURI', '');
  };

  const handleSetTokenURI = async () => {
    if (!parcelNFT) {
      console.warn('Parcel NFT Contract not loaded');
      return;
    }

    if (
      !(await execute(await parcelNFT.populateTransaction.setTokenURI(fields.newTokenURITokenId, fields.newTokenURI)))
    ) {
      return;
    }

    await refetch();

    setFieldValue('newTokenURI', '');
    setFieldValue('newTokenURITokenId', '');
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
      <DetailField>
        <DefaultTextField
          name="newTokenURI"
          type="text"
          label="New Token URI"
          autoComplete="off"
          value={fields.newTokenURI}
          required
          onChange={handleFieldChange}
        />
        <DefaultTextField
          name="newTokenURITokenId"
          type="text"
          label="Token ID for new URI"
          autoComplete="off"
          value={fields.newTokenURITokenId}
          required
          onChange={handleFieldChange}
        />
        <DefaultButton disabled={executing} onClick={handleSetTokenURI}>
          Set Token URI for Token ID
        </DefaultButton>
      </DetailField>
    </>
  );
};
export default ParcelNFTContractFields;

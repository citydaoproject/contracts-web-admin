import { ParcelNFT } from '@citydao/parcel-contracts/dist/types/contracts/ParcelNFT';
import React from 'react';
import { useFormFields } from '../../../../hooks/forms';
import DefaultTextField from '../../../common/forms/DefaultTextField';
import LoaderButton from '../../../common/forms/LoaderButton';
import DetailField from '../../../common/typography/DetailField';
import DetailTitle from '../../../common/typography/DetailTitle';
import DetailValue from '../../../common/typography/DetailValue';
import { useExecuteTransaction } from '../../../transactions/transactionHooks';

export interface BaseURIEditorProps {
  parcelNFT: ParcelNFT;
  baseURI: string;
  onChange?: (baseURI: string) => void;
}

interface BaseURIFields {
  baseURI: string;
}

const BaseURIEditor = ({ parcelNFT, baseURI, onChange }: BaseURIEditorProps) => {
  const { fields, handleFieldChange, resetFields } = useFormFields<BaseURIFields>({
    baseURI: '',
  });

  const { execute, executing } = useExecuteTransaction();

  const handleSetBaseURI = async () => {
    if (!(await execute(await parcelNFT.populateTransaction.setBaseURI(fields.baseURI)))) {
      return;
    }

    resetFields();

    if (onChange) {
      onChange(fields.baseURI);
    }
  };

  return (
    <DetailField>
      <DetailTitle>Base URI</DetailTitle>
      <DetailValue>{baseURI}</DetailValue>
      <DefaultTextField
        name="baseURI"
        type="text"
        label="New Base URI"
        autoComplete="off"
        value={fields.baseURI}
        required
        onChange={handleFieldChange}
      />
      <LoaderButton loading={executing} onClick={handleSetBaseURI}>
        Update Base URI
      </LoaderButton>
    </DetailField>
  );
};
export default BaseURIEditor;

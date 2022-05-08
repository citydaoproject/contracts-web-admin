import React from 'react';
import { ParcelNFT } from '@citydao/parcel-contracts/dist/types/contracts';
import { useFormFields } from '../../../../hooks/forms';
import DefaultTextField from '../../../common/forms/DefaultTextField';
import LoaderButton from '../../../common/forms/LoaderButton';
import DetailField from '../../../common/typography/DetailField';
import { useExecuteTransaction } from '../../../transactions/transactionHooks';

export interface TokenURIEditorProps {
  parcelNFT: ParcelNFT;
  onChange?: (tokenId: string, newTokenURI: string) => void;
}

interface TokenURIFields {
  tokenId: string;
  newTokenURI: string;
}

const TokenURIEditor = ({ parcelNFT, onChange }: TokenURIEditorProps) => {
  const { fields, handleFieldChange, resetFields } = useFormFields<TokenURIFields>({
    tokenId: '',
    newTokenURI: '',
  });

  const { execute, executing } = useExecuteTransaction();

  const handleSetTokenURI = async () => {
    if (!(await execute(await parcelNFT.populateTransaction.setTokenURI(fields.tokenId, fields.newTokenURI)))) {
      return;
    }

    resetFields();

    if (onChange) {
      onChange(fields.tokenId, fields.newTokenURI);
    }
  };

  return (
    <DetailField>
      <DefaultTextField
        name="tokenId"
        type="text"
        label="Token ID"
        autoComplete="off"
        value={fields.tokenId}
        required
        onChange={handleFieldChange}
      />
      <DefaultTextField
        name="newTokenURI"
        type="text"
        label="New Token URI"
        autoComplete="off"
        value={fields.newTokenURI}
        required
        onChange={handleFieldChange}
      />
      <LoaderButton loading={executing} onClick={handleSetTokenURI}>
        Set Token URI for Token ID
      </LoaderButton>
    </DetailField>
  );
};
export default TokenURIEditor;

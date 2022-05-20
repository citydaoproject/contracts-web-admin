import { ParcelNFT } from '@citydao/parcel-contracts/dist/types/contracts/ParcelNFT';
import { useSnackbar } from 'notistack';
import React from 'react';
import { EthereumAddress } from '@citydao/parcel-contracts/dist/src/constants/accounts';
import { useFormFields } from '../../../../hooks/forms';
import DefaultTextField from '../../../common/forms/DefaultTextField';
import LoaderButton from '../../../common/forms/LoaderButton';
import DetailField from '../../../common/typography/DetailField';
import DetailTitle from '../../../common/typography/DetailTitle';
import DetailValue from '../../../common/typography/DetailValue';
import { useExecuteTransaction } from '../../../transactions/transactionHooks';
import ContractLink from '../../ContractLink';

export interface OwnerEditorProps {
  parcelNFT: ParcelNFT;
  owner: EthereumAddress;
  onChange?: (owner: string) => void;
}

interface OwnerFields {
  owner: string;
}

const OwnerEditor = ({ parcelNFT, owner, onChange }: OwnerEditorProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const { fields, handleFieldChange, resetFields } = useFormFields<OwnerFields>({
    owner: '',
  });

  const { execute, executing } = useExecuteTransaction();

  const handleSetOwner = async () => {
    if (!(await execute(await parcelNFT.populateTransaction.transferOwnership(fields.owner)))) {
      return;
    }

    resetFields();

    if (onChange) {
      onChange(fields.owner);
    }

    enqueueSnackbar('Ownership tranferred successfully', { variant: 'success' });
  };

  return (
    <DetailField>
      <DetailTitle>Owner</DetailTitle>
      <DetailValue>
        <ContractLink address={owner} />
      </DetailValue>
      <DefaultTextField
        name="owner"
        type="text"
        label="New Owner"
        autoComplete="off"
        value={fields.owner}
        required
        onChange={handleFieldChange}
      />
      <LoaderButton loading={executing} onClick={handleSetOwner}>
        Transfer Ownership
      </LoaderButton>
    </DetailField>
  );
};
export default OwnerEditor;

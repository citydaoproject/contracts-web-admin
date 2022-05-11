import { ParcelNFT } from '@citydao/parcel-contracts/dist/types/contracts/ParcelNFT';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useFormFields } from '../../../../hooks/forms';
import { isValidAddress } from '../../../../utils/constants';
import { isTextPositiveIntOrZero } from '../../../../utils/strings';
import DefaultTextField from '../../../common/forms/DefaultTextField';
import LoaderButton from '../../../common/forms/LoaderButton';
import NumberField from '../../../common/forms/NumberField';
import DetailField from '../../../common/typography/DetailField';
import DetailTitle from '../../../common/typography/DetailTitle';
import { useExecuteTransaction } from '../../../transactions/transactionHooks';

export interface TokenRoyaltyEditorProps {
  parcelNFT: ParcelNFT;
  onChange?: (receiver: string, feeNumerator: number) => void;
}

interface TokenRoyaltyFields {
  tokenId: string;
  receiver: string;
  feeNumerator: string;
}

const TokenRoyaltyEditor = ({ parcelNFT, onChange }: TokenRoyaltyEditorProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const { fields, handleFieldChange, resetFields } = useFormFields<TokenRoyaltyFields>({
    tokenId: '',
    receiver: '',
    feeNumerator: '',
  });

  const { execute, executing } = useExecuteTransaction();

  const formValid =
    isValidAddress(fields.receiver) &&
    isTextPositiveIntOrZero(fields.feeNumerator) &&
    parseInt(fields.feeNumerator, 10) < 10000;

  const handleSetTokenRoyalty = async () => {
    const feeNumerator = parseInt(fields.feeNumerator, 10);
    if (
      !(await execute(
        await parcelNFT.populateTransaction.setTokenRoyalty(fields.tokenId, fields.receiver, feeNumerator),
      ))
    ) {
      return;
    }

    resetFields();

    if (onChange) {
      onChange(fields.receiver, feeNumerator);
    }

    enqueueSnackbar('Token Royalty set successfully', { variant: 'success' });
  };

  return (
    <DetailField>
      <DetailTitle>Token Royalty</DetailTitle>
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
        name="receiver"
        type="text"
        label="New Receiver Address"
        autoComplete="off"
        value={fields.receiver}
        required
        onChange={handleFieldChange}
      />
      <NumberField
        name="feeNumerator"
        type="text"
        label="New Fee Numerator"
        autoComplete="off"
        value={fields.feeNumerator}
        required
        onChange={handleFieldChange}
      />
      <LoaderButton loading={executing} disabled={!formValid} onClick={handleSetTokenRoyalty}>
        Update Token Royalty
      </LoaderButton>
    </DetailField>
  );
};
export default TokenRoyaltyEditor;

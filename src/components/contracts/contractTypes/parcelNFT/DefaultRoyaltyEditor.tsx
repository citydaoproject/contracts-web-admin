import { ParcelNFT } from '@citydao/parcel-contracts/dist/types/contracts/ParcelNFT';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useFormFields } from '../../../../hooks/forms';
import { isValidAddress } from '../../../../utils/constants';
import { isTextPositiveIntOrZero } from '../../../../utils/strings';
import DefaultTextField from '../../../common/forms/DefaultTextField';
import LoaderButton from '../../../common/forms/LoaderButton';
import NumberField from '../../../common/forms/NumberField';
import DetailField from '../../../common/typography/DetailField';
import DetailTitle from '../../../common/typography/DetailTitle';
import DetailValue from '../../../common/typography/DetailValue';
import { useExecuteTransaction } from '../../../transactions/transactionHooks';

export interface DefaultRoyaltyEditorProps {
  parcelNFT: ParcelNFT;
  onChange?: (receiver: string, feeNumerator: number) => void;
}

interface DefaultRoyaltyFields {
  receiver: string;
  feeNumerator: string;
}

const DefaultRoyaltyEditor = ({ parcelNFT, onChange }: DefaultRoyaltyEditorProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const { fields, handleFieldChange, resetFields } = useFormFields<DefaultRoyaltyFields>({
    receiver: '',
    feeNumerator: '',
  });
  const [receiver, setReceiver] = React.useState('');
  const [feeNumerator, setFeeNumerator] = React.useState(0);

  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    fetchDefaultRoyalty();
  }, []);

  const fetchDefaultRoyalty = async () => {
    const [receiver, feeNumerator] = await parcelNFT.royaltyInfo(0, 10000);
    setReceiver(receiver);
    setFeeNumerator(feeNumerator.toNumber());
  };

  const { execute, executing } = useExecuteTransaction();

  const formValid =
    isValidAddress(fields.receiver) &&
    isTextPositiveIntOrZero(fields.feeNumerator) &&
    parseInt(fields.feeNumerator, 10) < 10000;

  const handleSetDefaultRoyalty = async () => {
    const feeNumerator = parseInt(fields.feeNumerator, 10);
    if (!(await execute(await parcelNFT.populateTransaction.setDefaultRoyalty(fields.receiver, feeNumerator)))) {
      return;
    }

    resetFields();

    if (onChange) {
      onChange(fields.receiver, feeNumerator);
    }

    await fetchDefaultRoyalty();

    enqueueSnackbar('Default Royalty set successfully', { variant: 'success' });
  };

  return (
    <DetailField>
      <DetailTitle>Default Royalty</DetailTitle>
      <DetailTitle>Receiver</DetailTitle>
      <DetailValue>{receiver}</DetailValue>
      <DetailTitle>Fee Numerator</DetailTitle>
      <DetailValue>{feeNumerator}</DetailValue>
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
      <LoaderButton loading={executing} disabled={!formValid} onClick={handleSetDefaultRoyalty}>
        Update Default Royalty
      </LoaderButton>
    </DetailField>
  );
};
export default DefaultRoyaltyEditor;

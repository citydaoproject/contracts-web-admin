import { ParcelNFT } from '@citydao/parcel-contracts/dist/types/contracts/ParcelNFT';
import { BigNumber } from 'ethers';
import { DateTime } from 'luxon';
import React from 'react';
import { convertToClaimPeriodTimestamp } from '@citydao/parcel-contracts/src/contracts/AllowListClaim';
import { ParcelNFT__factory } from '@citydao//parcel-contracts/types/contracts';
import { useFormFields } from '../../../../hooks/forms';
import DefaultTextField from '../../../common/forms/DefaultTextField';
import LoaderButton from '../../../common/forms/LoaderButton';
import DetailField from '../../../common/typography/DetailField';
import DetailTitle from '../../../common/typography/DetailTitle';
import DetailValue from '../../../common/typography/DetailValue';
import { useExecuteTransaction } from '../../../transactions/transactionHooks';
import { useContractLoader } from '../../contractHooks';

export interface ClaimPeriodEditorProps {
  parcelNFT: ParcelNFT;
  onChange?: (start: string, end: string) => void;
}

interface ClaimPeriodFields {
  claimPeriodStart: string;
  claimPeriodEnd: string;
}

const ClaimPeriodEditor = ({ parcelNFT, onChange }: ClaimPeriodEditorProps) => {
  const { fields, handleFieldChange, resetFields } = useFormFields<ClaimPeriodFields>({
    claimPeriodStart: '',
    claimPeriodEnd: '',
  });

  const { execute, executing } = useExecuteTransaction();

  const { values, refetch } = useContractLoader(new ParcelNFT__factory(), parcelNFT.address, ['claimPeriod']);

  const [claimPeriodStartTimestamp, claimPeriodEndTimestamp] = values?.claimPeriod || [
    BigNumber.from(0),
    BigNumber.from(0),
  ];
  const claimPeriodStart = DateTime.fromSeconds(claimPeriodStartTimestamp.toNumber()).toISO();
  const claimPeriodEnd = DateTime.fromSeconds(claimPeriodEndTimestamp.toNumber()).toISO();

  const formValid = fields.claimPeriodStart && fields.claimPeriodEnd;

  const handleSetClaimPeriod = async () => {
    const start = convertToClaimPeriodTimestamp(fields.claimPeriodStart);
    const end = convertToClaimPeriodTimestamp(fields.claimPeriodEnd);

    if (!(await execute(await parcelNFT.populateTransaction.setClaimPeriod(start, end)))) {
      return;
    }

    resetFields();

    if (onChange) {
      onChange(fields.claimPeriodStart, fields.claimPeriodEnd);
    }

    await refetch();
  };

  return (
    <DetailField>
      <DetailTitle>Claim Period</DetailTitle>
      <DetailValue>
        <>
          {claimPeriodStart} to {claimPeriodEnd}
        </>
      </DetailValue>
      <DefaultTextField
        name="claimPeriodStart"
        type="text"
        label="New Claim Period Start"
        autoComplete="off"
        value={fields.claimPeriodStart}
        required
        onChange={handleFieldChange}
      />
      <DefaultTextField
        name="claimPeriodEnd"
        type="text"
        label="New Claim Period End"
        autoComplete="off"
        value={fields.claimPeriodEnd}
        required
        onChange={handleFieldChange}
      />
      <LoaderButton loading={executing} disabled={!formValid} onClick={handleSetClaimPeriod}>
        Update Claim Period
      </LoaderButton>
    </DetailField>
  );
};
export default ClaimPeriodEditor;

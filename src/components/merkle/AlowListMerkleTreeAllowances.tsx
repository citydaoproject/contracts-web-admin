import { EthereumAddress } from '@citydao/parcel-contracts/src/constants/accounts';
import { AllowListByAddress } from '@citydao/parcel-contracts/src/contracts/AllowListClaim';
import IconButton from '@mui/material/IconButton';
import { BigNumberish } from 'ethers';
import React from 'react';
import { useFormFields } from '../../hooks/forms';
import { isValidAddress } from '../../utils/constants';
import { isTextPositiveInt } from '../../utils/strings';
import RemoveIcon from '../common/actions/RemoveIcon';
import DefaultButton from '../common/forms/DefaultButton';
import DefaultTextField from '../common/forms/DefaultTextField';
import NumberField from '../common/forms/NumberField';
import DetailField from '../common/typography/DetailField';
import DetailTitle from '../common/typography/DetailTitle';
import DetailValue from '../common/typography/DetailValue';
import TooltipItem from '../common/typography/TooltipItem';

export interface AllowListMerkleTreeAllowancesProps {
  title?: string;
  allowList: AllowListByAddress;
  onAddAllowance?: (address: EthereumAddress, allowance: BigNumberish) => void;
  onRemoveAllowance?: (address: EthereumAddress, allowance: BigNumberish) => void;
  disabled?: boolean;
}

interface AllowListMerkleTreeAllowancesFields {
  newAddress: string;
  newAllowance: string;
}

const AllowListMerkleTreeAllowances = ({
  title,
  allowList,
  onAddAllowance,
  onRemoveAllowance,
  disabled,
}: AllowListMerkleTreeAllowancesProps) => {
  const { fields, handleFieldChange, setFieldValue, resetFields } = useFormFields<AllowListMerkleTreeAllowancesFields>({
    newAddress: '',
    newAllowance: '',
  });

  const formValid = fields.newAddress && isValidAddress(fields.newAddress) && isTextPositiveInt(fields.newAllowance);

  const handleAddAllowance = () => {
    if (onAddAllowance) {
      onAddAllowance(fields.newAddress, fields.newAllowance);
    }

    resetFields();
  };

  const handleRemoveAllowance = (account: EthereumAddress, allowance: BigNumberish) => {
    if (onRemoveAllowance) {
      onRemoveAllowance(account, allowance);
    }

    if (!fields.newAddress && !fields.newAllowance) {
      setFieldValue('newAddress', account);
      setFieldValue('newAllowance', allowance);
    }
  };

  return (
    <DetailField>
      <DetailTitle>{title || 'Allowances'}</DetailTitle>
      {onAddAllowance ? (
        <>
          <DefaultTextField
            name="newAddress"
            type="text"
            label="Address"
            autoComplete="off"
            value={fields.newAddress}
            required
            onChange={handleFieldChange}
          />
          <NumberField
            name="newAllowance"
            label="Allowance"
            autoComplete="off"
            value={fields.newAllowance}
            required
            onChange={handleFieldChange}
          />
          <DefaultButton disabled={!formValid || disabled} onClick={handleAddAllowance}>
            Add Allowance
          </DefaultButton>
        </>
      ) : null}

      {Object.keys(allowList).map((account: EthereumAddress) => (
        <DetailValue key={account}>
          <>
            {account}: {allowList[account]}
            {onRemoveAllowance ? (
              <TooltipItem title="Remove allowance">
                <IconButton
                  color="inherit"
                  size="small"
                  disabled={disabled}
                  onClick={() => handleRemoveAllowance(account, allowList[account] || 0)}
                >
                  <RemoveIcon />
                </IconButton>
              </TooltipItem>
            ) : null}
          </>
        </DetailValue>
      ))}
    </DetailField>
  );
};
export default AllowListMerkleTreeAllowances;

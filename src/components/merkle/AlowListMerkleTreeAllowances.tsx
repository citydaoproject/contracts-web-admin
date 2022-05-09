import { EthereumAddress } from '@citydao/parcel-contracts/src/constants/accounts';
import { AllowListByAddress } from '@citydao/parcel-contracts/src/contracts/AllowListClaim';
import { css } from '@emotion/react';
import Button from '@mui/material/Button';
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
  onAddAllowances?: (allowances: AllowListByAddress) => void;
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
  onAddAllowances,
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

  const handleUploadFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      console.log('no files');
      return;
    }

    const allowancesText = await getAsText(event.target.files[0]);
    const allowances = JSON.parse(allowancesText);

    if (onAddAllowances) {
      onAddAllowances(allowances);
    } else if (onAddAllowance) {
      Object.keys(allowances).forEach((account) => {
        onAddAllowance(account, allowances[account]);
      });
    }
  };

  const getAsText = (readFile) => {
    const reader = new FileReader();

    // Read file into memory as UTF-16
    reader.readAsText(readFile, 'UTF-8');

    const promise = new Promise<string>((resolve, reject) => {
      reader.onload = (event) => {
        if (!event.target || !event.target.result) {
          reject('No data');
          return;
        }

        const result = event.target.result.toString();
        resolve(result);
      };

      reader.onerror = (event) => {
        if (!event.target || !event.target.error) {
          reject('No error');
          return;
        }

        reject(event.target.error.name);
      };
    });

    // Handle progress, success, and errors
    reader.onprogress = (event) => {
      console.log(`Loading file: ${(event.loaded / event.total) * 100}%`);
    };

    return promise;
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

          <DetailField>
            <input
              id="button-file-input"
              type="file"
              accept="text/json"
              css={css`
                display: none;
              `}
              onChange={handleUploadFileChange}
            />
            <label htmlFor="button-file-input">
              <Button component="span">Upload Allowance List</Button>
            </label>
          </DetailField>
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

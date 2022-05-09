import { EthereumAddress } from '@citydao/parcel-contracts/src/constants/accounts';
import {
  AllowListByAddress,
  buildMerkleTreeForAllowList,
} from '@citydao/parcel-contracts/src/contracts/AllowListClaim';
import IconButton from '@mui/material/IconButton';
import { BigNumberish } from 'ethers';
import React, { useState } from 'react';
import { useFormFields } from '../../../../hooks/forms';
import { isValidAddress } from '../../../../utils/constants';
import { isTextPositiveInt } from '../../../../utils/strings';
import RemoveIcon from '../../../common/actions/RemoveIcon';
import DefaultButton from '../../../common/forms/DefaultButton';
import DefaultTextField from '../../../common/forms/DefaultTextField';
import NumberField from '../../../common/forms/NumberField';
import DetailField from '../../../common/typography/DetailField';
import DetailTitle from '../../../common/typography/DetailTitle';
import DetailValue from '../../../common/typography/DetailValue';
import TooltipItem from '../../../common/typography/TooltipItem';

export interface GenerateMerkleRootProps {
  onGenerateMerkleRoot?: (merkleRoot: string) => void;
}

interface GenerateMerkleRootFields {
  newAddress: string;
  newAllowance: string;
}

const GenerateMerkleRoot = ({ onGenerateMerkleRoot }: GenerateMerkleRootProps) => {
  const { fields, handleFieldChange, setFieldValue, resetFields } = useFormFields<GenerateMerkleRootFields>({
    newAddress: '',
    newAllowance: '',
  });

  const [allowList, setAllowList] = useState<AllowListByAddress>({});

  const formValid = fields.newAddress && isValidAddress(fields.newAddress) && isTextPositiveInt(fields.newAllowance);

  const handleAddAllowance = () => {
    setAllowList({ ...allowList, [fields.newAddress]: fields.newAllowance });
    resetFields();
  };

  const handleRemoveAllowance = (account: EthereumAddress, allowance: BigNumberish) => {
    const newAllowList = { ...allowList };
    delete newAllowList[account];
    setAllowList(newAllowList);

    if (!fields.newAddress && !fields.newAllowance) {
      setFieldValue('newAddress', account);
      setFieldValue('newAllowance', allowance);
    }
  };

  const handleGenerateMerkleRoot = () => {
    if (onGenerateMerkleRoot) {
      onGenerateMerkleRoot(buildMerkleTreeForAllowList(allowList).getHexRoot());
    }
  };

  return (
    <DetailField>
      <DetailTitle>Generate Merkle Root</DetailTitle>
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
      <DefaultButton disabled={!formValid} onClick={handleAddAllowance}>
        Add Allowance
      </DefaultButton>

      {Object.keys(allowList).map((account: EthereumAddress) => (
        <DetailValue key={account}>
          <>
            {account}: {allowList[account]}
            <TooltipItem title="Remove allowance">
              <IconButton
                color="inherit"
                size="small"
                onClick={() => handleRemoveAllowance(account, allowList[account] || 0)}
              >
                <RemoveIcon />
              </IconButton>
            </TooltipItem>
          </>
        </DetailValue>
      ))}

      <DefaultButton onClick={handleGenerateMerkleRoot}>Generate Merkle Root</DefaultButton>
    </DetailField>
  );
};
export default GenerateMerkleRoot;

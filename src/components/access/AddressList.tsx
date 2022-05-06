import IconButton from '@mui/material/IconButton';
import { ethers } from 'ethers';
import React from 'react';
import { useFormFields } from '../../hooks/forms';
import { isValidAddress } from '../../utils/constants';
import RemoveIcon from '../common/actions/RemoveIcon';
import DefaultButton from '../common/forms/DefaultButton';
import DefaultTextField from '../common/forms/DefaultTextField';
import DetailField from '../common/typography/DetailField';
import DetailTitle from '../common/typography/DetailTitle';
import DetailValue from '../common/typography/DetailValue';
import TooltipItem from '../common/typography/TooltipItem';

export interface AddressListProps {
  title?: string;
  addresses: string[];
  disabled?: boolean;
  onAddAddress?: (address: string) => void;
  onRemoveAddress?: (address: string) => void;
}

interface AddressListFields {
  newAddress: string;
}

const AddressList = ({ title, addresses, disabled, onAddAddress, onRemoveAddress }: AddressListProps) => {
  const { fields, handleFieldChange, setFieldValue, resetFields } = useFormFields<AddressListFields>({
    newAddress: '',
  });

  const formValid = fields.newAddress && isValidAddress(fields.newAddress);

  const handleAddAddress = () => {
    if (!onAddAddress) {
      return;
    }

    const newAddress = fields.newAddress;
    if (!newAddress) {
      return;
    }

    onAddAddress(ethers.utils.getAddress(newAddress));
    resetFields();
  };

  const handleRemoveAddress = (address: string) => {
    if (!onRemoveAddress) {
      return;
    }

    onRemoveAddress(address);
    if (!fields.newAddress) {
      setFieldValue('newAddress', address);
    }
  };

  return (
    <DetailField>
      <DetailTitle>{title ? title : 'Wallet Addresses'}</DetailTitle>
      {onAddAddress ? (
        <>
          <DefaultTextField
            name="newAddress"
            type="text"
            label="Add another address"
            autoComplete="off"
            value={fields.newAddress}
            required
            onChange={handleFieldChange}
          />
          <DefaultButton onClick={handleAddAddress} disabled={!formValid}>
            Add Wallet Address
          </DefaultButton>
        </>
      ) : null}
      {addresses.map((address) => (
        <DetailValue key={address}>
          {address}:{' '}
          {onRemoveAddress ? (
            <TooltipItem title="Remove wallet address">
              <IconButton color="inherit" size="small" onClick={() => handleRemoveAddress(address)} disabled={disabled}>
                <RemoveIcon />
              </IconButton>
            </TooltipItem>
          ) : null}
        </DetailValue>
      ))}
    </DetailField>
  );
};
export default AddressList;

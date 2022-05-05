import IconButton from '@mui/material/IconButton';
import React, { useMemo } from 'react';
import { useFormFields } from '../../hooks/forms';
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
  const { fields, handleFieldChange, setFieldValue } = useFormFields<AddressListFields>({ newAddress: '' });

  const formValid = useMemo(() => !!fields.newAddress, [fields.newAddress]);

  const handleAddAddress = () => {
    if (!onAddAddress) {
      return;
    }

    const newAddress = fields.newAddress;
    if (!newAddress) {
      return;
    }

    onAddAddress(newAddress);
    setFieldValue('newAddress', '');
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

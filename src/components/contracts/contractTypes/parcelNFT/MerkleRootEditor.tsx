import { ParcelNFT } from '@citydao/parcel-contracts/dist/types/contracts/ParcelNFT';
import React from 'react';
import { useFormFields } from '../../../../hooks/forms';
import DefaultTextField from '../../../common/forms/DefaultTextField';
import LoaderButton from '../../../common/forms/LoaderButton';
import { newMerkleTreePath } from '../../../common/routes/paths';
import RouteLink from '../../../common/routes/RouteLink';
import DetailField from '../../../common/typography/DetailField';
import DetailTitle from '../../../common/typography/DetailTitle';
import DetailValue from '../../../common/typography/DetailValue';
import { useExecuteTransaction } from '../../../transactions/transactionHooks';

export interface MerkleRootEditorProps {
  parcelNFT: ParcelNFT;
  merkleRoot: string;
  onChange?: (merkleRoot: string) => void;
}

interface MerkleRootFields {
  merkleRoot: string;
}

const MerkleRootEditor = ({ parcelNFT, merkleRoot, onChange }: MerkleRootEditorProps) => {
  const { fields, handleFieldChange, resetFields } = useFormFields<MerkleRootFields>({
    merkleRoot: '',
  });

  const { execute, executing } = useExecuteTransaction();

  const handleSetMerkleRoot = async () => {
    if (!(await execute(await parcelNFT.populateTransaction.setMerkleRoot(fields.merkleRoot)))) {
      return;
    }

    resetFields();

    if (onChange) {
      onChange(fields.merkleRoot);
    }
  };

  return (
    <DetailField>
      <DetailTitle>Merkle Root</DetailTitle>
      <DetailValue>{merkleRoot}</DetailValue>
      <DefaultTextField
        name="merkleRoot"
        type="text"
        label="New Merkle Root"
        autoComplete="off"
        value={fields.merkleRoot}
        required
        onChange={handleFieldChange}
      />
      <LoaderButton loading={executing} onClick={handleSetMerkleRoot}>
        Update Merkle Root
      </LoaderButton>
      <br />
      See <RouteLink path={newMerkleTreePath}>New Merkle Tree</RouteLink> to create a new Merkle Tree.
    </DetailField>
  );
};
export default MerkleRootEditor;

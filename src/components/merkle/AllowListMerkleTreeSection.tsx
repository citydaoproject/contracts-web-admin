import { css } from '@emotion/react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { BigNumber } from 'ethers';
import React from 'react';
import { AllowListMerkleTreeDetails } from '../../data/merkleTrees';
import CopyToClipboard from '../common/actions/CopyToClipboard';
import ExpandIcon from '../common/actions/ExpandIcon';
import DefaultButton from '../common/forms/DefaultButton';
import DetailField from '../common/typography/DetailField';
import DetailTitle from '../common/typography/DetailTitle';
import DetailValue from '../common/typography/DetailValue';
import AllowListMerkleTreeAllowances from './AlowListMerkleTreeAllowances';

export interface AllowListMerkleTreeSectionProps {
  merkleTree: AllowListMerkleTreeDetails;
  disabled?: boolean;
  onRemoveMerkleTree?: (merkleTree: AllowListMerkleTreeDetails) => void;
}

const AllowListMerkleTreeSection = ({ merkleTree, disabled, onRemoveMerkleTree }: AllowListMerkleTreeSectionProps) => (
  <Accordion
    css={css`
      overflow-x: auto;
    `}
  >
    <AccordionSummary expandIcon={<ExpandIcon />}>{extractSummary(merkleTree)}</AccordionSummary>
    <AccordionDetails>
      <DetailField>
        <DetailTitle>Merkle Root</DetailTitle>
        <DetailValue>
          <>
            {merkleTree.root} <CopyToClipboard text={merkleTree.root} />
          </>
        </DetailValue>
      </DetailField>

      <AllowListMerkleTreeAllowances allowList={merkleTree.allowList} />
      {onRemoveMerkleTree ? (
        <DefaultButton disabled={disabled} onClick={() => onRemoveMerkleTree(merkleTree)}>
          Remove Merkle Tree
        </DefaultButton>
      ) : null}
    </AccordionDetails>
  </Accordion>
);
export default AllowListMerkleTreeSection;

const extractSummary = (merkleTree: AllowListMerkleTreeDetails) =>
  '' +
  Object.values(merkleTree.allowList).reduce(
    (total, allowance) => BigNumber.from(total).toNumber() + BigNumber.from(allowance).toNumber(),
    0,
  ) +
  ' tokens over ' +
  Object.keys(merkleTree.allowList).length +
  ' accounts';

import { PausableUpgradeable__factory } from '@citydao/parcel-contracts/dist/types/contracts/factories/PausableUpgradeable__factory';
import IconButton from '@mui/material/IconButton';
import { useSnackbar } from 'notistack';
import React from 'react';
import DetailField from '../common/typography/DetailField';
import DetailValue from '../common/typography/DetailValue';
import TooltipItem from '../common/typography/TooltipItem';
import { useInterfaceLoader } from './contractHooks';
import PauseIcon from './PauseIcon';
import ResumeIcon from './ResumeIcon';

export interface PauseContractProps {
  pauseableContractAddress: string;
  onPause: () => Promise<boolean>;
  onResume: () => Promise<boolean>;
}

const PauseContract = ({ pauseableContractAddress, onPause, onResume }: PauseContractProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const {
    contract: pauseableContract,
    values,
    refetch,
  } = useInterfaceLoader(PausableUpgradeable__factory.connect, pauseableContractAddress, ['paused']);

  const [executing, setExecuting] = React.useState(false);

  const handlePauseContract = async () => {
    if (!pauseableContract) {
      console.warn('No pauseable contract found');
      return;
    }

    setExecuting(true);
    try {
      const paused = await onPause();

      if (!paused) {
        return;
      }

      await refetch();

      enqueueSnackbar('Contract paused successfully', { variant: 'success' });
    } finally {
      setExecuting(false);
    }
  };

  const handleResumeContract = async () => {
    if (!pauseableContract) {
      console.warn('No pauseable contract found');
      return;
    }

    setExecuting(true);
    try {
      const resumed = await onResume();

      if (!resumed) {
        return;
      }

      await refetch();

      enqueueSnackbar('Contract resumed successfully', { variant: 'success' });
    } finally {
      setExecuting(false);
    }
  };

  if (!pauseableContract || !values) {
    return null;
  }

  return (
    <DetailField>
      <DetailValue>
        {values.paused ? (
          <>
            Paused{' '}
            <TooltipItem title="Resume contract">
              <IconButton color="inherit" size="small" disabled={executing} onClick={handleResumeContract}>
                <ResumeIcon />
              </IconButton>
            </TooltipItem>
          </>
        ) : (
          <>
            Not Paused{' '}
            <>
              <TooltipItem title="Pause contract">
                <IconButton color="inherit" size="small" disabled={executing} onClick={handlePauseContract}>
                  <PauseIcon />
                </IconButton>
              </TooltipItem>
            </>
          </>
        )}
      </DetailValue>
    </DetailField>
  );
};
export default PauseContract;

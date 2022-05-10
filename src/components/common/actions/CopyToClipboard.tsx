import { css } from '@emotion/react';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import React from 'react';
import { CopyToClipboard as CopyToClipboardComponent } from 'react-copy-to-clipboard';
import TooltipItem from '../typography/TooltipItem';
import CopyIcon from './CopyIcon';

export interface CopyToClipboardProps {
  title?: string;
  text: string;
  indicatorSize?: string;
  disabled?: boolean;
  onCopy?: (string) => void;
}

const CopyToClipboard = ({ title, text, indicatorSize, disabled, onCopy }: CopyToClipboardProps) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const handleCopy = (_value: string) => {
    enqueueSnackbar('Copied to clipboard', { variant: 'success' });
  };

  return (
    <CopyToClipboardComponent text={text} onCopy={onCopy || handleCopy}>
      <TooltipItem title={title || 'Copy to clipboard'}>
        <IconButton color="inherit" disabled={disabled}>
          <CopyIcon
            css={css`
              font-size: ${indicatorSize || theme.typography.body1.fontSize};
            `}
          />
        </IconButton>
      </TooltipItem>
    </CopyToClipboardComponent>
  );
};
export default CopyToClipboard;

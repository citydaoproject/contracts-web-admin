import { css } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import { Property } from 'csstype';
import React from 'react';
import ExternalLinkIcon from '../icons/ExternalLinkIcon';
import TooltipItem from './TooltipItem';

export interface ExternalLinkIndicatorProps {
  indicatorFontSize?: Property.FontSize<string | number>;
}

const ExternalLinkIndicator = ({ indicatorFontSize }: ExternalLinkIndicatorProps) => {
  const theme = useTheme();
  return (
    <TooltipItem title="external link opens in a new tab">
      <ExternalLinkIcon
        css={css`
          font-size: ${indicatorFontSize || theme.typography.body1.fontSize};
        `}
      />
    </TooltipItem>
  );
};
export default ExternalLinkIndicator;

import Link, { LinkProps } from '@mui/material/Link';
import React from 'react';
import ExternalLinkIndicator, { ExternalLinkIndicatorProps } from './ExternalLinkIndicator';

export interface ExternalLinkProps extends LinkProps, ExternalLinkIndicatorProps {
  suppressExternalIndicator?: boolean;
}

const ExternalLink = ({ target, suppressExternalIndicator, indicatorFontSize, ...rest }: ExternalLinkProps) => (
  <>
    <Link {...rest} target={target || '_blank'} rel="external nofollow noopener" />
    {!suppressExternalIndicator ? (
      <>
        &nbsp;
        <ExternalLinkIndicator indicatorFontSize={indicatorFontSize} />
      </>
    ) : null}
  </>
);
export default ExternalLink;

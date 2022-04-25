import { Link, LinkProps } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type RouteLinkProps = Omit<LinkProps, 'onClick' | 'href'> & {
  path: string;
};

const RouteLink = ({ path, ...rest }: RouteLinkProps) => {
  const navigate = useNavigate();
  const goToPath = (event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    navigate(path);
  };
  return <Link {...rest} onClick={goToPath} href={path} />;
};
export default RouteLink;

import Button, { ButtonProps } from '@mui/material/Button';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

type RouteButtonProps = Omit<ButtonProps, 'onClick' | 'href'> & {
  path: string;
};

const RouteButton = ({ path, ...rest }: RouteButtonProps) => {
  const navigate = useNavigate();
  const goToPath = (event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    navigate(path);
  };
  return <Button {...rest} onClick={goToPath} href={path} />;
};
export default RouteButton;

import * as React from 'react';
import { usePageTitle } from '../../hooks/page';

export const Main = () => {
  usePageTitle();
  return <div>This is something!</div>;
};

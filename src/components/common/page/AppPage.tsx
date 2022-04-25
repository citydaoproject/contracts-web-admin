import React from 'react';
import FullPage from '../containers/FullPage';
import PageContent from './PageContent';

interface AppPageProps {
  children?: React.ReactNode;
}

const AppPage = ({ children }: AppPageProps) => (
  <FullPage>
    <PageContent>{children}</PageContent>
  </FullPage>
);
export default AppPage;

import React from 'react';
import FullPage from '../containers/FullPage';
import PageBar from './bar/PageBar';
import AppNav from './nav/AppNav';
import PageContent from './PageContent';

interface AppPageProps {
  children?: React.ReactNode;
}

const AppPage = ({ children }: AppPageProps) => (
  <FullPage>
    <PageBar />
    <AppNav />
    <PageContent>{children}</PageContent>
  </FullPage>
);
export default AppPage;

import React from 'react';
import { Navbar, SideMenu } from '../ui';

interface Props {
  title: string;
  subTitle: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const AdminLayout = ({ title, subTitle, icon, children }: Props) => {
  return (
    <>
      <Navbar />

      <SideMenu />

      <main
        style={{
          margin: '80px auto',
          maxWidth: '1440px',
          padding: '0px 30px',
        }}>
        {children}
      </main>

      <footer>{/* custom footer */}</footer>
    </>
  );
};

import React from 'react';
import { Box, SideMenu, Typography } from '../ui';
import { AdminNavar } from '../admin';
import Head from 'next/head';

interface Props {
  title: string;
  subTitle: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const AdminLayout = ({ title, subTitle, icon, children }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>        
        <meta name='og:title' content={title} />
      </Head>
      <AdminNavar />

      <SideMenu />

      <main
        style={{
          margin: '80px auto',
          maxWidth: '1440px',
          padding: '0px 30px',
        }}>
        <Box display={'flex'} flexDirection={'column'}>
          <Typography variant='h1' component={'h1'}>
            {icon} {title}
          </Typography>

          <Typography variant='h2' sx={{ mb: 1 }}>
            {subTitle}
          </Typography>
        </Box>

        <Box className='fadeIn'>{children}</Box>
      </main>

      <footer>{/* custom footer */}</footer>
    </>
  );
};

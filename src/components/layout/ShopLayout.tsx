import React from 'react';
import Head from 'next/head';
import { Navbar, SideMenu } from '../ui';

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  children: React.ReactNode;
}

export const ShopLayout = ({
  title,
  pageDescription,
  imageFullUrl,
  children,
}: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={pageDescription} />
        <meta name='og:title' content={title} />
        <meta name='og:description' content={pageDescription} />

        {imageFullUrl && <meta name='og:image' content={imageFullUrl} />}
      </Head>


      <Navbar/>

      <SideMenu/>

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

import { ReactNode } from 'react';
import NextLink from 'next/link';
import MuiLink from '@mui/material/Link';

interface Props {
  href: string;
  children: ReactNode;
  underline?: 'none' | 'hover' | 'always' | undefined;
}

export const PageLink = ({ href, children, underline = 'none' }: Props) => {
  // return (
  //   <NextLink href={href}>
  //     {children}
  //   </NextLink>
  // );
  return (
    <MuiLink component={NextLink} href={href} passHref underline={underline}>
      {children}
    </MuiLink>
  );
};

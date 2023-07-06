import NextLink from 'next/link';
import MuiLink, { LinkProps } from '@mui/material/Link';

export const PageLink = ({
  href,
  children,
  underline = 'none',
  ...rest
}: LinkProps) => {
  // return <NextLink href={href || '/'}>{children}</NextLink>;
  return (
    <MuiLink
      component={NextLink}
      href={href}
      passHref
      underline={underline}
      prefetch={false}
      {...rest}>
      {children}
    </MuiLink>
  );
};

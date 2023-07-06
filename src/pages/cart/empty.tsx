import React from 'react';
import NextLink from 'next/link';

import { ShopLayout } from '@/components/layout';
import {
  Box,
  Typography,
  Link,
  RemoveShoppingCartOutlined,
} from '@/components/ui';

const EmptyPage = () => {
  return (
    <ShopLayout
      title='Carrito vacio'
      pageDescription='No hay artículos en el carrito de compras'>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        height={'calc(100vh - 200px)'}
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display='flex' flexDirection='column' alignContent='center'>
          <Typography>Su carrito está vació</Typography>
          <Link component={NextLink} href='/' passHref underline='none'>
            <Typography variant='h4' color='secondary'>
              Regresar
            </Typography>
          </Link>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;

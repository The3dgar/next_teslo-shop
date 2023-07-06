import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useCartContext } from '@/context';
import { ShopLayout } from '@/components/layout';
import { CartList, OrderSummary } from '@/components/cart';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
} from '@/components/ui';

const CartPage = () => {
  const { isLoaded, cart } = useCartContext();

  const router = useRouter();

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace('/cart/empty');
    }
  }, [cart.length, isLoaded, router]);

  if (!isLoaded) return <></>;

  return (
    <ShopLayout title='Carrito - 3' pageDescription='Carro de compras'>
      <Typography variant='h1'>Carro de compras</Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-ca2rd'>
            <CardContent>
              <Typography variant='h2'>Order</Typography>
              <Divider sx={{ my: 1 }} />

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button
                  color='secondary'
                  className='circular-btn'
                  fullWidth
                  href='/checkout/address'>
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;

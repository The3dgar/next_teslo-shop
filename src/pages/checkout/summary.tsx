import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { countries } from '@/utils';
import { useCartContext } from '@/context';
import { ShopLayout } from '@/components/layout';
import { CartList, OrderSummary } from '@/components/cart';
import {
  PageLink,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
  Chip,
  ErrorOutline,
} from '@/components/ui';

const SummaryPage = () => {
  const router = useRouter();
  const { shippingAddress, numberOfItems, createOrder } = useCartContext();
  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    address,
    city,
    country,
    firstName,
    lastName,
    phone,
    zip,
    address2 = '',
  } = shippingAddress;

  useEffect(() => {
    if (!firstName) {
      router.push('/checkout/address');
    }
  }, [router, firstName]);

  const onCreateOrder = async () => {
    setIsPosting(true);
    const { hasError, message } = await createOrder();

    if (hasError) {
      setIsPosting(false);
      setErrorMessage(message);
      return;
    }

    router.replace(`/orders/${message}`);
  };

  return (
    <ShopLayout title='Resumen de compra' pageDescription='Resumen de la orden'>
      <Typography variant='h1'>Resumen de la orden</Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>
                Resumen ({numberOfItems}{' '}
                {numberOfItems === 1 ? 'producto' : 'productos'})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display={'flex'} justifyContent={'space-between'}>
                <Typography variant='subtitle1'>
                  Direccion de entrega
                </Typography>
                <PageLink href='/checkout/address' underline='always'>
                  Editar
                </PageLink>
              </Box>

              <Typography>
                {firstName} {lastName}
              </Typography>
              <Typography>
                {address} {address2 ? `, ${address2}` : ''}
              </Typography>
              <Typography>
                {city}, {zip}
              </Typography>
              <Typography>
                {countries.find((c) => c.code === country)?.name}
              </Typography>
              <Typography>{phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display={'flex'} justifyContent={'end'}>
                <PageLink href='/cart' underline='always'>
                  Editar
                </PageLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }} display={'flex'} flexDirection={'column'}>
                <Button
                  disabled={isPosting}
                  type='submit'
                  onClick={onCreateOrder}
                  color='secondary'
                  className='circular-btn'
                  fullWidth>
                  Confirmar Orden
                </Button>

                <Chip
                  label='Error'
                  color='error'
                  className='fadeIn'
                  sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                  icon={<ErrorOutline />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;

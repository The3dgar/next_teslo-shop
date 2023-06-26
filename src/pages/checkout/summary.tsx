import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
} from '@mui/material';
import { ShopLayout } from '@/components/layout';
import { CartList, OrderSummary } from '@/components/cart';
import { PageLink } from '@/components/ui';
import { useCartContext } from '@/context';
import { countries } from '@/utils';

const SummaryPage = () => {
  const { shippingAddress, numberOfItems } = useCartContext();

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

              <Box sx={{ mt: 3 }}>
                <Button color='secondary' className='circular-btn' fullWidth>
                  Confirmar Orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;

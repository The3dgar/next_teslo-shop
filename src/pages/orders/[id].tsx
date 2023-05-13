import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
} from '@mui/material';
import { ShopLayout } from '@/components/layout';
import { CartList, OrderSummary } from '@/components/cart';
import { PageLink } from '@/components/ui';
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from '@mui/icons-material';

const OrderPage = () => {
  return (
    <ShopLayout
      title='Resumen de compra 123456789'
      pageDescription='Resumen de la orden'>
      <Typography variant='h1'>Order: ABC123</Typography>

      <Chip
        sx={{ my: 2 }}
        label='Pendiente de pago'
        variant='outlined'
        color='error'
        icon={<CreditCardOffOutlined />}
      />

      <Chip
        sx={{ my: 2 }}
        label='Orden pagada'
        variant='outlined'
        color='success'
        icon={<CreditScoreOutlined />}
      />

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Resumen (3 productos)</Typography>
              <Divider sx={{ my: 1 }} />

              <Box display={'flex'} justifyContent={'space-between'}>
                <Typography variant='subtitle1'>
                  Direccion de entrega
                </Typography>
                <PageLink href='/checkout/address' underline='always'>
                  Editar
                </PageLink>
              </Box>

              <Typography>Edgar Olivar</Typography>
              <Typography>312 Casa cualquier cosa</Typography>
              <Typography>Santiago, RM</Typography>
              <Typography>Chile</Typography>
              <Typography>78945613</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display={'flex'} justifyContent={'end'}>
                <PageLink href='/cart' underline='always'>
                  Editar
                </PageLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <h1>Pagar</h1>

                <Chip
                  sx={{ my: 2 }}
                  label='Orden pagada'
                  variant='outlined'
                  color='success'
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;

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

const SummaryPage = () => {
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

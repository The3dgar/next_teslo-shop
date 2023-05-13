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

const CartPage = () => {
  return (
    <ShopLayout title='Carrito - 3' pageDescription='Carro de compras'>
      <Typography variant='h1'>Carro de compras</Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable/>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Order</Typography>
              <Divider sx={{ my: 1 }} />

              <OrderSummary/>

              <Box sx={{ mt: 3 }}>
                <Button color='secondary' className='circular-btn' fullWidth>
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

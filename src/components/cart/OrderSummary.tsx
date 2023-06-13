import { Typography, Grid } from '@mui/material';
import { useCartContext } from '@/context';
import { Constans, Currency } from '@/utils';

export const OrderSummary = () => {
  const { numberOfItems, total, subTotal, taxRate } = useCartContext();
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display={'flex'} justifyContent={'end'}>
        <Typography>
          {numberOfItems} {numberOfItems > 1 ? 'items' : 'item'}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display={'flex'} justifyContent={'end'}>
        <Typography>{Currency.format(subTotal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Impuesto({100 * Constans.TAX_RATE}%)</Typography>
      </Grid>
      <Grid item xs={6} display={'flex'} justifyContent={'end'}>
        <Typography>{Currency.format(taxRate)}</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant='subtitle1'>Total</Typography>
      </Grid>
      <Grid item xs={6} display={'flex'} justifyContent={'end'} sx={{ mt: 2 }}>
        <Typography variant='subtitle1'>{Currency.format(total)}</Typography>
      </Grid>
    </Grid>
  );
};

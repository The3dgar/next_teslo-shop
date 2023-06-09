import { useCartContext } from '@/context';
import { Constans, Currency } from '@/utils';
import { Typography, Grid } from '../ui';

interface Props {
  orderValues?: {
    numberOfItems: number;
    total: number;
    subTotal: number;
    taxRate: number;
  };
}

export const OrderSummary = ({ orderValues }: Props) => {
  const { numberOfItems, total, subTotal, taxRate } = useCartContext();

  const summaryValues = orderValues || {
    numberOfItems,
    total,
    subTotal,
    taxRate,
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display={'flex'} justifyContent={'end'}>
        <Typography>
          {summaryValues.numberOfItems}{' '}
          {summaryValues.numberOfItems > 1 ? 'items' : 'item'}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display={'flex'} justifyContent={'end'}>
        <Typography>{Currency.format(summaryValues.subTotal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Impuesto({100 * Constans.TAX_RATE}%)</Typography>
      </Grid>
      <Grid item xs={6} display={'flex'} justifyContent={'end'}>
        <Typography>{Currency.format(summaryValues.taxRate)}</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant='subtitle1'>Total</Typography>
      </Grid>
      <Grid item xs={6} display={'flex'} justifyContent={'end'} sx={{ mt: 2 }}>
        <Typography variant='subtitle1'>
          {Currency.format(summaryValues.total)}
        </Typography>
      </Grid>
    </Grid>
  );
};

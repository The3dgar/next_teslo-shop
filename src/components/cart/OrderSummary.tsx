import NextLink from 'next/link';
import {
  Box,
  Typography,
  Link,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
  CardActionArea,
  CardMedia,
} from '@mui/material';

export const OrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display={'flex'} justifyContent={'center'}>
        <Typography>3 items</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display={'flex'} justifyContent={'center'}>
        <Typography>{`$${255.36}`}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Impuesto(15%)</Typography>
      </Grid>
      <Grid item xs={6} display={'flex'} justifyContent={'center'}>
        <Typography>{`$${255.36}`}</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant='subtitle1'>Total</Typography>
      </Grid>
      <Grid item xs={6} display={'flex'} justifyContent={'center'} sx={{ mt: 2 }}>
        <Typography variant='subtitle1'>{`$${300.36}`}</Typography>
      </Grid>
    </Grid>
  );
};

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
import { initialData } from '@/database/products';
import { ItemCounter } from '../ui';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  editable?: boolean;
}

export const CartList = ({ editable = false }: Props) => {
  return (
    <>
      {productsInCart.map((p) => (
        <Grid container key={p.slug} spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            <Link
              component={NextLink}
              href='/product/slug'
              passHref
              underline='none'>
              <CardActionArea>
                <CardMedia
                  image={`/products/${p.images[0]}`}
                  component={'img'}
                  sx={{ borderRadius: '5px' }}
                />
              </CardActionArea>
            </Link>
          </Grid>
          <Grid item xs={7}>
            <Box display='flex' flexDirection={'column'}>
              <Typography variant='body1'>{p.title}</Typography>
              <Typography variant='body1'>
                Talla: <strong>M</strong>
              </Typography>
              {editable ? (
                <ItemCounter />
              ) : (
                <Typography variant='h5'>3 items</Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={2} alignItems={'center'} flexDirection={'column'}>
            <Typography variant='subtitle1'>{`$${p.price}`}</Typography>
            {editable && (
              <Button variant='text' color='secondary'>
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};

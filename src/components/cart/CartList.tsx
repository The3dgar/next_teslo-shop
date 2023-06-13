import NextLink from 'next/link';
import {
  Box,
  Typography,
  Link,
  Grid,
  Button,
  CardActionArea,
  CardMedia,
} from '@mui/material';
import { ItemCounter } from '../ui';
import { useCartContext } from '@/context';
import { ICartProduct } from '@/interfaces';
import { Constans } from '@/utils';

interface Props {
  editable?: boolean;
}

export const CartList = ({ editable = false }: Props) => {
  const { cart, updateCartQuantity, removeCartProduct } = useCartContext();

  const onNewCartQuantity = (product: ICartProduct, quantity: number) => {
    product.quantity = quantity;
    updateCartQuantity(product);
  };

  const onRemoveProduct = (product: ICartProduct) => {
    removeCartProduct(product);
  };

  return (
    <>
      {cart.map((p) => (
        <Grid container key={p.slug + p.size} spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            <Link
              component={NextLink}
              href={`/product/${p.slug}`}
              passHref
              underline='none'>
              <CardActionArea>
                <CardMedia
                  image={`/products/${p.images}`}
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
                Talla: <strong>{p.size}</strong>
              </Typography>
              {editable ? (
                <ItemCounter
                  currentValue={p.quantity}
                  maxValue={Constans.CART_MAX_VALUE}
                  updateQuantity={(quantity) => {
                    onNewCartQuantity(p, quantity);
                  }}
                />
              ) : (
                <Typography variant='h5'>
                  {p.quantity} {p.quantity > 1 ? 'Productos' : 'Producto'}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={2} alignItems={'center'} flexDirection={'column'}>
            <Typography variant='subtitle1'>{`$${p.price}`}</Typography>
            {editable && (
              <Button
                variant='text'
                color='secondary'
                onClick={() => onRemoveProduct(p)}>
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};

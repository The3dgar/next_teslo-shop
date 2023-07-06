import NextLink from 'next/link';

import { ICartProduct, IOrderItem } from '@/interfaces';
import { useCartContext } from '@/context';
import { Constans } from '@/utils';
import {
  Box,
  Typography,
  Link,
  Grid,
  Button,
  CardActionArea,
  CardMedia,
  ItemCounter,
} from '../ui';

interface Props {
  editable?: boolean;
  products?: IOrderItem[];
}

export const CartList = ({ editable = false, products }: Props) => {
  const { cart, updateCartQuantity, removeCartProduct } = useCartContext();

  const onNewCartQuantity = (product: ICartProduct, quantity: number) => {
    product.quantity = quantity;
    updateCartQuantity(product);
  };

  const onRemoveProduct = (product: ICartProduct) => {
    removeCartProduct(product);
  };

  const productsToShow = products ? products : cart;

  return (
    <>
      {productsToShow.map((p) => (
        <Grid container key={p.slug + p.size} spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            <Link
              component={NextLink}
              href={`/product/${p.slug}`}
              passHref
              underline='none'>
              <CardActionArea>
                <CardMedia
                  image={`/products/${p.image}`}
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
                    onNewCartQuantity(p as ICartProduct, quantity);
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
                onClick={() => onRemoveProduct(p as ICartProduct)}>
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};

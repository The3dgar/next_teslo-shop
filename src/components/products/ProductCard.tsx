import { useState, useMemo } from 'react';
import NextLink from 'next/link';
import { IProducts } from '@/interfaces';
import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Box,
  Typography,
  Link,
} from '@mui/material';

interface Props {
  product: IProducts;
}
export const ProductCard = ({ product }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const produtImg = useMemo(() => {
    return isHovered
      ? `products/${product.images[1]}`
      : `products/${product.images[0]}`;
  }, [isHovered, product.images]);

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Card>
        <Link component={NextLink} href='/product/slug' passHref prefetch={false}>
          <CardActionArea>
            <CardMedia
              component='img'
              className='fadeIn'
              image={produtImg}
              alt={product.title}
            />
          </CardActionArea>
        </Link>
      </Card>

      <Box sx={{ mt: 1 }} className='fadeIn'>
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>{`$${product.price}`}</Typography>
      </Box>
    </Grid>
  );
};

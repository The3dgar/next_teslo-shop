import {
  Grid
} from '@mui/material';
import { IProducts } from '@/interfaces';
import { ProductCard } from '.';

interface Props {
  products: IProducts[];
}

export const ProductList = ({ products }: Props) => {
  return (
    <Grid container spacing={4}>
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </Grid>
  );
};

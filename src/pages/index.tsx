import { Typography } from '@mui/material';
import { ShopLayout } from '@/components/layout';
import { initialData } from '@/api/database/products';
import { ProductList } from '@/components/products';
import { IProducts } from '@/interfaces';

export default function Home() {
  const products = initialData.products;
  return (
    <ShopLayout
      title='Teslo-Shop - Home'
      pageDescription='Encuentra los mejores productos de Teslo'>
      <Typography variant='h1' component='h1'>
        Tienda
      </Typography>
      <Typography variant='h2' sx={{ marginBottom: 1 }}>
        Todos los productos
      </Typography>

      <ProductList products={products as IProducts[]} />
    </ShopLayout>
  );
}

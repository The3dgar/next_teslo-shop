import { GetServerSideProps } from 'next';

import { dbProducts } from '@/api/database';
import { IProducts } from '@/interfaces';

import { ShopLayout } from '@/components/layout';
import { ProductList } from '@/components/products';
import { Box, Typography } from '@/components/ui';

interface Props {
  products: IProducts[];
  query: string;
  foundProducts: boolean;
}

export default function QueryPage({ products, query, foundProducts }: Props) {
  return (
    <ShopLayout
      title='Teslo-Shop - Home'
      pageDescription='Encuentra los mejores productos de Teslo'>
      <Typography variant='h1' component='h1'>
        Buscar producto
      </Typography>
      {foundProducts ? (
        <Typography variant='h2' sx={{ mb: 1 }} textTransform={'capitalize'}>
          Resultados para {`${query}`}
        </Typography>
      ) : (
        <Box display={'flex'}>
          <Typography variant='h2' sx={{ mb: 1 }}>
            No encontramos ningún producto para
          </Typography>
          <Typography variant='h2' sx={{ ml: 1 }} color={'secondary'}>
            {`${query}`}
          </Typography>
        </Box>
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const query = ctx.params?.query as string;
  if (!query.length) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }
  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts = products.length;

  if (!products.length) {
    // todo: retornar otros productos si no hay productos
    // products = await dbProducts.getAllProducts({});
    // teniendo las cookies podriamos buscar lo ultimo que busco el usuario
    products = await dbProducts.getProductsByTerm('shirt');
  }

  return {
    props: {
      products,
      query,
      foundProducts,
    },
  };
};

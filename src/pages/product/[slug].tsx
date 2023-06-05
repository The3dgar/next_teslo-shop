import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Grid, Button, Box, Typography, Chip } from '@mui/material';

import { ShopLayout } from '@/components/layout';
import { dbProducts } from '@/api/database';
import { ProductSlideshow, SizeSelector } from '@/components/products';
import { ItemCounter } from '@/components/ui';
import { IProducts } from '@/interfaces';
interface Props {
  product: IProducts;
}

const ProductPage = ({ product }: Props) => {
  /**
   * usando useRouter no favorece SEO, por que los bots no ejecutan js
   */
  // const router = useRouter();
  // const { products: product, isLoading } = useProducts(
  //   `/products/${router.query.slug}`
  // );

  // if (isLoading) {
  //   return <h1>Cargando...</h1>
  // }

  // if (!product) {
  //   return <h1>Producto no existe</h1>
  // }

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            <Typography variant='h1' component='h1'>
              {product.title}
            </Typography>
            <Typography variant='subtitle1' component='h2'>
              {`$${product.price}`}
            </Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <SizeSelector
                sizes={product.sizes}
                selectedSize={product.sizes[0]}
              />
              <ItemCounter />
            </Box>
            {/* Agregar al carrito */}
            <Button color='secondary' className='circular-btn'>
              Agregar al carrito{' '}
            </Button>

            <Chip label='No hay disponibles' color='error' variant='outlined' />

            {/* Description */}
            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Descripción</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default ProductPage;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// import { GetServerSideProps } from 'next';

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const product = await dbProducts.getProductBySlug(`${ctx.params?.slug}`);

//   if (!product) {
//     return {
//       redirect: {
//         // podemos hacer redirect a /404
//         destination: '/',
//         // esto para no quitar la posibilidad de que en un futuro agreguemos esta pagina
//         permanent: false,
//       }
//     }
//   }
//   return {
//     props: {
//       product
//     },
//   };
// };

// get staticPaths...
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes


export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const slugs = await dbProducts.getAllProductsSlugs();

  return {
    paths: slugs.map(({slug}) => ({
      params: {
        slug,
      },
    })),
    fallback: 'blocking',
  };
};

// getStaticProps...
// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  const product = await dbProducts.getProductBySlug(`${ctx.params?.slug}`);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};

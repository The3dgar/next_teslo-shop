import { ShopLayout } from '@/components/layout'
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';
import { useProducts } from '@/hooks';
import { Typography } from '@mui/material'
import React from 'react'

const MenPage = () => {
  const { isError, products, isLoading } = useProducts('/products?gender=men');

  if (isError) return <div>failed to load</div>;
  return (
    <ShopLayout
      title='Teslo-Shop - Home'
      pageDescription='Encuentra los mejores productos de hombres en Teslo'>
      <Typography variant='h1' component='h1'>
        Men
      </Typography>
      <Typography variant='h2' sx={{ marginBottom: 1 }}>
        Men&apos;s Products
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  )
}

export default MenPage
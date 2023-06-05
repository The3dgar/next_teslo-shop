import { ShopLayout } from '@/components/layout'
import { ProductList } from '@/components/products';
import { FullScreenLoading } from '@/components/ui';
import { useProducts } from '@/hooks';
import { Typography } from '@mui/material'
import React from 'react'

const KidPage = () => {
  const { isError, products, isLoading } = useProducts('/products?gender=kid');

  if (isError) return <div>failed to load</div>;
  return (
    <ShopLayout
      title='Teslo-Shop - Home'
      pageDescription='Encuentra los mejores productos de niños en Teslo'>
      <Typography variant='h1' component='h1'>
        Kid
      </Typography>
      <Typography variant='h2' sx={{ marginBottom: 1 }}>
        Kid&apos;s Products
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  )
}

export default KidPage
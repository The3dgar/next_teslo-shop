import React from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { IProducts } from '@/interfaces';
import { useAdmin } from '@/hooks';

import { AdminLayout } from '@/components/layout';
import { AdminTable } from '@/components/admin';
import {
  AddCircleOutline,
  Box,
  Button,
  CardMedia,
  CategoryOutlined,
  FullScreenLoading,
  PageLink,
  Typography,
} from '@/components/ui';

const columns: GridColDef[] = [
  {
    field: 'img',
    headerName: 'Foto',
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/product/${row.slug}`} target='_blank'>
          <CardMedia
            alt={row.title}
            component={'img'}
            className='fadeIn'
            image={row.img}
          />
        </a>
      );
    },
  },
  {
    field: 'title',
    headerName: 'Nombre producto',
    width: 250,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <PageLink href={`/admin/products/${row.slug}`} underline='always'>
          {row.title}
        </PageLink>
      );
    },
  },
  { field: 'gender', headerName: 'Genero' },
  { field: 'type', headerName: 'Tipo' },
  { field: 'inStock', headerName: 'En stock' },
  { field: 'price', headerName: 'Precio' },
  { field: 'sizes', headerName: 'Tallas', width: 250 },
];

const ProductsPage = () => {
  const { isError, isLoading, data } = useAdmin<IProducts[]>('admin/products');

  if (isLoading) {
    return <FullScreenLoading />;
  }

  if (isError) {
    console.log({ isError });
    return <Typography>Error al cargar la data</Typography>;
  }

  const rows = data!.map((product) => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    slug: product.slug,
    sizes: product.sizes.join(', '),
  }));

  return (
    <AdminLayout
      title={`Productos (${rows.length})`}
      subTitle='Mantenimiento de productos'
      icon={<CategoryOutlined />}>
      <Box display={'flex'} justifyContent={'end'} sx={{ mb: 2 }}>
        <Button
          startIcon={<AddCircleOutline />}
          color='secondary'
          href='/admin/products/new'>
          Crear producto
        </Button>
      </Box>
      <AdminTable rows={rows} columns={columns} />
    </AdminLayout>
  );
};

export default ProductsPage;

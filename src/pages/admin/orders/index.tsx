import React from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { IOrder, IUser } from '@/interfaces';

import { useAdmin } from '@/hooks';
import { AdminLayout } from '@/components/layout';
import {
  Chip,
  ConfirmationNumberOutlined,
  FullScreenLoading,
  Typography,
} from '@/components/ui';
import { AdminTable } from '@/components/admin';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Orden Id', width: 250 },
  { field: 'email', headerName: 'Correo', width: 250 },
  {
    field: 'name',
    headerName: 'Nombre Completo',
    width: 150,
  },
  { field: 'total', headerName: 'Monto total', width: 100 },
  {
    field: 'isPaid',
    headerName: 'Pagada',
    renderCell: ({ row }: GridRenderCellParams) => {
      return row.isPaid ? (
        <Chip variant='outlined' label='Pagada' color='success' />
      ) : (
        <Chip variant='outlined' label='Pendiente' color='error' />
      );
    },
    width: 150,
  },
  {
    field: 'quantity',
    headerName: 'N° de productos',
    align: 'center',
    width: 150,
  },
  {
    field: 'check',
    headerName: 'Ver orden',
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/admin/orders/${row.id}`} target='_blank'>
          Ver orden
        </a>
      );
    },
    width: 100,
  },
  { field: 'createdAt', headerName: 'Creada en', width: 250 },
];

const OrdersPage = () => {
  const { isError, isLoading, data } = useAdmin<IOrder[]>('admin/orders');

  if (isLoading) {
    return <FullScreenLoading />;
  }

  if (isError) {
    console.log({ isError });
    return <Typography>Error al cargar la data</Typography>;
  }

  const rows = data!.map((order) => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.total,
    isPaid: order.isPaid,
    quantity: order.numberOfItems,
    createdAt: order.createdAt,
  }));

  return (
    <AdminLayout
      title='Ordenes'
      subTitle='Mantenimiento de ordenes'
      icon={<ConfirmationNumberOutlined />}>
      <AdminTable rows={rows} columns={columns} />
    </AdminLayout>
  );
};

export default OrdersPage;

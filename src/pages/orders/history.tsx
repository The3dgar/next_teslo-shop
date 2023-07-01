import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import { Typography, Grid, Chip } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

import { ShopLayout } from '@/components/layout';
import { PageLink } from '@/components/ui';
import { dbOrder } from '@/api/database';
import { IOrder } from '@/interfaces';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'fullname',
    headerName: 'Nombre Completo',
    width: 300,
    sortable: false,
  },
  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Estado de la orden',
    width: 200,
    renderCell: (params) => {
      return params.row.paid ? (
        <Chip color='success' label='Pagada' variant='outlined' />
      ) : (
        <Chip color='error' label='Pendiente' variant='outlined' />
      );
    },
  },
  {
    field: 'orderId',
    headerName: 'Orden',
    description: 'Detalle de la orden',
    width: 200,
    sortable: false,
    renderCell: (params) => {
      return (
        <PageLink href={`/orders/${params.row.orderId}`} underline='always'>
          Ver Orden
        </PageLink>
      );
    },
  },
];

interface Props {
  orders: IOrder[];
}

const HistoryPage = ({ orders }: Props) => {
  const rows: GridRowsProp = orders.map((order, i) => ({
    id: i + 1,
    paid: order.isPaid,
    fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
    orderId: order._id,
  }));

  return (
    <ShopLayout
      title='Historial de ordenes'
      pageDescription='Historial de ordenes del cliente'>
      <Typography variant='h1' component={'h1'}>
        Historial de ordenes
      </Typography>

      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: '650px', width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                  page: 0,
                },
              },
            }}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/history`,
        permanent: false,
      },
    };
  }

  const orders = await dbOrder.getOrdersByUser(session.user?._id!);

  return {
    props: {
      orders,
    },
  };
};

export default HistoryPage;

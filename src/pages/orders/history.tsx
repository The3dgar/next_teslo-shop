import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
  Chip,
} from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

import { ShopLayout } from '@/components/layout';
import { PageLink } from '@/components/ui';

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
    field: 'order',
    headerName: 'Orden',
    description: 'Detalle de la orden',
    width: 200,
    sortable: false,
    renderCell: (params) => {
      return (
        <PageLink href={`/orders/${params.row.id}`} underline='always'>
          Ver Orden
        </PageLink>
      );
    },
  },
];

const rows: GridRowsProp = [
  { id: 1, paid: true, fullname: 'Edgar Olivar', order: 2 },
  { id: 2, paid: false, fullname: 'Julianny', order: 2 },
  { id: 3, paid: false, fullname: 'Bimba', order: 2 },
  { id: 4, paid: true, fullname: 'Julian', order: 2 },
];

const HistoryPage = () => {
  return (
    <ShopLayout
      title='Historial de ordenes'
      pageDescription='Historial de ordenes del cliente'>
      <Typography variant='h1' component={'h1'}>
        Historial de ordenes
      </Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: '650px', width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
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

export default HistoryPage;

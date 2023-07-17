import React, { useState, useEffect } from 'react';

import { AdminDashboard } from '@/interfaces';

import { useAdmin } from '@/hooks';
import { AdminLayout } from '@/components/layout';
import { SummaryTile } from '@/components/admin';
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  DashboardOutlined,
  FullScreenLoading,
  Grid,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
  Typography,
} from '@/components/ui';

const DashboardPage = () => {
  const { isError, isLoading, data } = useAdmin<AdminDashboard>(
    'admin/dashboard',
    {
      refreshInterval: 30 * 1000,
    }
  );

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);

    return () => {
      // cuando ya no sea necesario
      clearInterval(interval);
    };
  }, []);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  if (isError) {
    console.log({ isError });
    return <Typography>Error al cargar la data</Typography>;
  }

  const {
    lowInventory,
    notPaidOrders,
    numberOfClients,
    numberOfOrders,
    numberOfProducts,
    paidOrders,
    productsWithNoInventory,
  } = data!;

  return (
    <AdminLayout
      title='Dashboard'
      subTitle='Estadisticas generales'
      icon={<DashboardOutlined />}>
      <Grid container spacing={2}>
        <SummaryTile
          icon={<CreditCardOffOutlined color='secondary' fontSize='large' />}
          title={numberOfOrders}
          subTitle='Ordenes totales'
        />
        <SummaryTile
          icon={<AttachMoneyOutlined color='secondary' fontSize='large' />}
          title={paidOrders}
          subTitle='Ordenes pagadas'
        />
        <SummaryTile
          icon={<CreditCardOffOutlined color='error' fontSize='large' />}
          title={notPaidOrders}
          subTitle='Ordenes pendientes'
        />
        <SummaryTile
          icon={<GroupOutlined color='primary' fontSize='large' />}
          title={numberOfClients}
          subTitle='Clientes'
        />
        <SummaryTile
          icon={<CategoryOutlined color='warning' fontSize='large' />}
          title={numberOfProducts}
          subTitle='Productos'
        />
        <SummaryTile
          icon={<CancelPresentationOutlined color='error' fontSize='large' />}
          title={productsWithNoInventory}
          subTitle='Sin stock'
        />
        <SummaryTile
          icon={
            <ProductionQuantityLimitsOutlined color='error' fontSize='large' />
          }
          title={lowInventory}
          subTitle='Bajo stock'
        />
        <SummaryTile
          icon={<AccessTimeOutlined color='error' fontSize='large' />}
          title={refreshIn}
          subTitle='Actulización en:'
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;

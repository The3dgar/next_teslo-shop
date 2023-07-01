import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
} from '@mui/material';
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from '@mui/icons-material';

import { ShopLayout } from '@/components/layout';
import { CartList, OrderSummary } from '@/components/cart';
import { PageLink } from '@/components/ui';
import { dbOrder } from '@/api/database';
import { IOrder } from '@/interfaces';
import { getCountryById } from '@/utils';

interface Props {
  order: IOrder;
}

const OrderPage = ({ order }: Props) => {
  const { shippingAddress, numberOfItems } = order;
  return (
    <ShopLayout title='Resumen de compra' pageDescription='Resumen de la orden'>
      <Typography variant='h1'>Orden {order._id}</Typography>

      {order.isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label='Orden pagada'
          variant='outlined'
          color='success'
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label='Pendiente de pago'
          variant='outlined'
          color='error'
          icon={<CreditCardOffOutlined />}
        />
      )}

      <Grid container className='fadeIn'>
        <Grid item xs={12} sm={7}>
          <CartList products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>
                Resumen ({numberOfItems}
                {numberOfItems > 1 ? 'productos' : 'producto'})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display={'flex'} justifyContent={'space-between'}>
                <Typography variant='subtitle1'>
                  Direccion de entrega
                </Typography>
                <PageLink href='/checkout/address' underline='always'>
                  Editar
                </PageLink>
              </Box>

              <Typography>
                {shippingAddress.firstName} {shippingAddress.lastName}
              </Typography>
              <Typography>
                {shippingAddress.address}{' '}
                {shippingAddress.address2 && `, ${shippingAddress.address2}`}
              </Typography>
              <Typography>{shippingAddress.city}</Typography>
              <Typography>
                {getCountryById(shippingAddress.country)?.name}
              </Typography>
              <Typography>{shippingAddress.phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display={'flex'} justifyContent={'end'}>
                <PageLink href='/cart' underline='always'>
                  Editar
                </PageLink>
              </Box>

              <OrderSummary orderValues={{ ...order }} />

              <Box sx={{ mt: 3 }} display='flex' flexDirection={'column'}>
                {order.isPaid ? (
                  <Chip
                    sx={{ my: 2 }}
                    label='Orden pagada'
                    variant='outlined'
                    color='success'
                    icon={<CreditScoreOutlined />}
                  />
                ) : (
                  <h1>Pagar</h1>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = '' } = query;

  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrder.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        permanent: false,
        destination: '/orders/history',
      },
    };
  }

  if (order.user !== session.user?._id) {
    return {
      redirect: {
        permanent: false,
        destination: '/orders/history',
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;

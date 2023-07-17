import { GetServerSideProps } from 'next';

import { dbOrder } from '@/api/database';
import { IOrder } from '@/interfaces';
import { getCountryById } from '@/utils';

import { AdminLayout } from '@/components/layout';
import { CartList, OrderSummary } from '@/components/cart';
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  PageLink,
  AirplaneTicketOutlined,
} from '@/components/ui';

interface Props {
  order: IOrder;
}

const OrderPage = ({ order }: Props) => {
  const { shippingAddress, numberOfItems } = order;
  return (
    <AdminLayout
      title='Resumen de la orden'
      subTitle={`Order Id: ${order._id}`}
      icon={<AirplaneTicketOutlined />}>
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
                Resumen ({numberOfItems}{' '}
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
              <OrderSummary orderValues={{ ...order }} />

              <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                <Box display='flex' flexDirection='column'>
                  {order.isPaid ? (
                    <Chip
                      sx={{ my: 2, flex: 1 }}
                      label='Orden pagada'
                      variant='outlined'
                      color='success'
                      icon={<CreditScoreOutlined />}
                    />
                  ) : (
                    <Chip
                      sx={{ my: 2, flex: 1 }}
                      label='Pendiente de pago'
                      variant='outlined'
                      color='error'
                      icon={<CreditCardOffOutlined />}
                    />
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id = '' } = query;

  const order = await dbOrder.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/orders',
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

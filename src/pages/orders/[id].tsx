import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { PayPalButtons } from '@paypal/react-paypal-js';

import { dbOrder } from '@/api/database';
import { IOrder } from '@/interfaces';
import { getCountryById } from '@/utils';
import { OrderService } from '@/services';

import { ShopLayout } from '@/components/layout';
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
  CircularProgress,
  PageLink,
} from '@/components/ui';

interface Props {
  order: IOrder;
}

export type OrderResponseBody = {
  id: string;
  status:
    | 'COMPLETED'
    | 'SAVED'
    | 'APPROVED'
    | 'VOIDED'
    | 'PAYER_ACTION_REQUIRED'
    | 'CREATED';
};

const OrderPage = ({ order }: Props) => {
  const { shippingAddress, numberOfItems } = order;
  const router = useRouter();

  const [isPayment, setIsPayment] = useState(false);
  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== 'COMPLETED') {
      return alert('No hay pago en Paypal');
    }

    setIsPayment(true);

    try {
      const data = await OrderService.validateOrderPayment(
        details.id,
        order._id!
      );
      router.reload();
    } catch (error) {
      setIsPayment(false);
      console.log(error);
      alert('error');
    }
  };
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
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  sx={{
                    display: isPayment ? 'flex' : 'none',
                  }}
                  className='fadeIn'>
                  <CircularProgress />
                </Box>

                <Box
                  sx={{ display: isPayment ? 'none' : 'flex', flex: 1 }}
                  flexDirection={'column'}>
                  {order.isPaid ? (
                    <Chip
                      sx={{ my: 2 }}
                      label='Orden pagada'
                      variant='outlined'
                      color='success'
                      icon={<CreditScoreOutlined />}
                    />
                  ) : (
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: `${order.total}`,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order!.capture().then((details) => {
                          onOrderCompleted(details);
                        });
                      }}
                    />
                  )}
                </Box>
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

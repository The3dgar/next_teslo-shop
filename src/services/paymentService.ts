import axios from 'axios';
import { IPayment } from '@/interfaces';
import { Constans } from '@/utils';

// todo: create httpService
export const getPaypalBearerToken = async () => {
  try {
    const body = new URLSearchParams('grant_type=client_credentials');

    const base64Token = Buffer.from(
      `${Constans.PAYMENT_PAYPAL_CLIENT}:${Constans.PAYMENT_PAYPAL_SECRET}`,
      'utf-8'
    ).toString('base64');

    const { data } = await axios.post(Constans.PAYMENT_PAYPAL_OAUTH_URL, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${base64Token}`,
      },
    });

    return data.access_token as string;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }

    return null;
  }
};

export const validatePayment = async (id: string, paymentToken: string) => {
  const url = `${Constans.PAYMENT_PAYPAL_ORDERS_URL}/${id}`;

  const { data } = await axios.get<IPayment.PaypalOrderStatusResponse>(url, {
    headers: {
      Authorization: `Bearer ${paymentToken}`,
    },
  });

  return data;
};
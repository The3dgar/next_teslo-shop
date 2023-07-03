export const CART_MAX_VALUE = 10;
export const TAX_RATE = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
export const TOKEN_SECRET_SEED = process.env.TOKEN_SECRET_SEED!;

export const COOKIE_TOKEN_KEY = 'token';
export const COOKIE_CART_KEY = 'cart';
export const COOKIE_ADDRESS_KEY = 'address';

// payments providers
export const PAYMENT_PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT!;
export const PAYMENT_PAYPAL_SECRET = process.env.PAYPAL_SECRET!;
export const PAYMENT_PAYPAL_OAUTH_URL = process.env.PAYPAL_OAUTH_URL!;
export const PAYMENT_PAYPAL_ORDERS_URL = process.env.PAYPAL_ORDERS_URL!;

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  FormControl,
  MenuItem,
} from '@mui/material';
import { ShopLayout } from '@/components/layout';
import { countries } from '@/utils';
import { COOKIE_ADDRESS_KEY } from '@/utils/constans';
import { useCartContext } from '@/context';

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
};

const defaultCountry = countries[5].code;

const defaultShippingAddress = {
  firstName: '',
  lastName: '',
  address: '',
  address2: '',
  zip: '',
  city: '',
  country: countries[5].code,
  phone: '',
};

const AddresPage = () => {
  const router = useRouter();
  const { updateShippingAddress } = useCartContext();

  const getAddressFromCookies = () => {
    const address = Cookies.get(COOKIE_ADDRESS_KEY)
      ? JSON.parse(Cookies.get(COOKIE_ADDRESS_KEY)!)
      : defaultShippingAddress;

    return address as FormData;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: getAddressFromCookies(),
  });

  const onSubmitAddress = (props: FormData) => {
    updateShippingAddress(props);
    router.push('/checkout/summary');
  };

  return (
    <ShopLayout title='Checkout' pageDescription='Confirmar address'>
      <Typography variant='h1' component={'h1'}>
        Dirección
      </Typography>

      <form onSubmit={handleSubmit(onSubmitAddress)} noValidate>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Nombre'
              variant='filled'
              fullWidth
              {...register('firstName', {
                required: 'Este campo es requerido',
                minLength: {
                  value: 3,
                  message: 'Min 3 caracteres',
                },
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Apellido'
              variant='filled'
              fullWidth
              {...register('lastName', {
                required: 'Este campo es requerido',
                minLength: {
                  value: 3,
                  message: 'Min 3 caracteres',
                },
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Dirección'
              variant='filled'
              fullWidth
              {...register('address', {
                required: 'Este campo es requerido',
                minLength: {
                  value: 6,
                  message: 'Min 6 caracteres',
                },
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Dirección 2 (opcional)'
              variant='filled'
              fullWidth
              {...register('address2')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Codigo postal'
              variant='filled'
              fullWidth
              {...register('zip', {
                required: 'Este campo es requerido',
                minLength: {
                  value: 3,
                  message: 'Min 3 caracteres',
                },
              })}
              error={!!errors.zip}
              helperText={errors.zip?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Ciudad'
              variant='filled'
              fullWidth
              {...register('city', {
                required: 'Este campo es requerido',
                minLength: {
                  value: 3,
                  message: 'Min 3 caracteres',
                },
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                select
                variant='filled'
                label='País'
                defaultValue={defaultCountry}
                {...register('country', {
                  required: 'Este campo es requerido',
                })}
                error={!!errors.country}>
                {countries.map((c) => (
                  <MenuItem value={c.code} key={c.code}>
                    {c.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Celular'
              variant='filled'
              fullWidth
              {...register('phone', {
                required: 'Este campo es requerido',
                minLength: {
                  value: 9,
                  message: 'Min 9 caracteres',
                },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 5 }} display='flex' justifyContent={'center'}>
          <Button
            color='secondary'
            className='circular-btn'
            size='large'
            type='submit'>
            Revisar pedido
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

export default AddresPage;

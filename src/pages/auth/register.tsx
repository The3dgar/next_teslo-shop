import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { useAuthContext } from '@/context';
import { Validations } from '@/utils';
import { AuthLayout } from '@/components/layout';
import {
  Box,
  Button,
  Chip,
  Grid,
  TextField,
  Typography,
  ErrorOutline,
  PageLink,
} from '@/components/ui';

type FormData = {
  email: string;
  password: string;
  name: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const { registerUser } = useAuthContext();

  const router = useRouter();

  const onRegisterForm = async ({ email, name, password }: FormData) => {
    setShowError(false);

    const data = await registerUser(name, email, password);
    if (data.hasError) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);

      return;
    }

    await signIn('credentials', { email, password });
  };

  return (
    <AuthLayout title='Registrarse'>
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component={'h1'}>
                Crear cuenta
              </Typography>
              <Chip
                label='No se pudo registrar esta cuenta'
                color='error'
                className='fadeIn'
                sx={{ display: showError ? 'flex' : 'none' }}
                icon={<ErrorOutline />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Nombre completo'
                variant='filled'
                fullWidth
                {...register('name', {
                  required: 'Este campo es requerido',
                  minLength: {
                    value: 3,
                    message: 'Min 3 caracteres',
                  },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='email'
                label='Correo'
                variant='filled'
                fullWidth
                {...register('email', {
                  required: 'Este campo es requerido',
                  validate: (val) => Validations.isEmail(val),
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Contraseña'
                type='password'
                variant='filled'
                {...register('password', {
                  required: true,
                  minLength: {
                    value: 6,
                    message: 'Min 6 caracteres',
                  },
                })}
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                color='secondary'
                className='circular-btn'
                size='large'
                fullWidth>
                Registrar
              </Button>
            </Grid>
            <Grid item xs={12} display={'flex'} justifyContent={'end'}>
              <PageLink
                href={
                  router.query.p
                    ? `/auth/login?p=${router.query.p}`
                    : '/auth/login'
                }
                underline='always'>
                ¿Ya tienes cuenta?
              </PageLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ req: ctx.req });

  const { p = '/' } = ctx.query;
  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default RegisterPage;

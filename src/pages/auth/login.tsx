import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import {
  getSession,
  signIn,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { useForm } from 'react-hook-form';

import { Validations } from '@/utils';
import { AuthLayout } from '@/components/layout';
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  TextField,
  Typography,
  ErrorOutline,
  PageLink,
} from '@/components/ui';

type FormData = {
  email: string;
  password: string;
};

type ProviderType = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);
  const router = useRouter();

  const [providers, setProviders] = useState<ProviderType>(null);

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    /**
     * Custom login
     */

    // const isValidLoggin = await loginUser(email, password);

    // if (!isValidLoggin) {
    //   setShowError(true);
    //   setTimeout(() => {
    //     setShowError(false);
    //   }, 3000);
    //   return;
    // }

    // const destination = router.query.p?.toString() || '/';
    // router.replace(destination);

    await signIn('credentials', {
      email,
      password,
    });
  };

  return (
    <AuthLayout title='Ingresar'>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component={'h1'}>
                Iniciar sesión
              </Typography>
              <Chip
                label='No reconocemos ese usuario|contraseña'
                color='error'
                className='fadeIn'
                sx={{ display: showError ? 'flex' : 'none' }}
                icon={<ErrorOutline />}
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
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display={'flex'} justifyContent={'end'}>
              <PageLink
                href={
                  router.query.p
                    ? `/auth/register?p=${router.query.p}`
                    : '/auth/register'
                }
                underline='always'>
                ¿No tienes cuenta?
              </PageLink>
            </Grid>

            <Grid
              item
              xs={12}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'end'}>
              <Divider sx={{ width: '100%', mb: 2 }} />
              {providers &&
                Object.values(providers!).map((prov) => {
                  if (prov.id === 'credentials') {
                    return <div key='credentials'></div>;
                  }
                  return (
                    <Button
                      key={prov.id}
                      variant='outlined'
                      fullWidth
                      onClick={() => signIn(prov.id)}
                      color='primary'>
                      {prov.name}
                    </Button>
                  );
                })}
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

export default LoginPage;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Box, Button, Chip, Grid, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

import { AuthLayout } from '@/components/layout';
import { PageLink } from '@/components/ui';
import { Validations } from '@/utils';
import { useAuthContext } from '@/context';

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);
  const { loginUser } = useAuthContext();
  const router = useRouter();

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    const isValidLoggin = await loginUser(email, password);

    if (!isValidLoggin) {
      console.log('Error en las credenciales');
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }
    // todo: navegar a la pantalla anterior donde estaba o al home
    router.replace('/');
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
              <PageLink href='/auth/register' underline='always'>
                ¿No tienes cuenta?
              </PageLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;

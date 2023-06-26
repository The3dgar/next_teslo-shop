import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Box, Button, Chip, Grid, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

import { AuthLayout } from '@/components/layout';
import { PageLink } from '@/components/ui';
import { Validations } from '@/utils';
import { useAuthContext } from '@/context';

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

    const destination = router.query.p?.toString() || '/';
    router.replace(destination);
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
              <PageLink href='/auth/login' underline='always'>
                ¿Ya tienes cuenta?
              </PageLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;

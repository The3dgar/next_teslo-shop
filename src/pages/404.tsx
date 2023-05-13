import { ShopLayout } from '@/components/layout';
import { Box, Typography } from '@mui/material';

export default function Custom404Page() {
  return (
    <ShopLayout
      title='Page not found'
      pageDescription='No hay nada que mostrar aqui'>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        height={'calc(100vh - 200px)'}
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
        <Typography variant='h1' component='h1' fontSize={100} fontWeight={200}>
          404
        </Typography>
        <Typography marginLeft={2}>No hay nada aquí</Typography>
      </Box>
    </ShopLayout>
  );
}

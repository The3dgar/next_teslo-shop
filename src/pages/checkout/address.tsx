import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { ShopLayout } from '@/components/layout';

const AddresPage = () => {
  return (
    <ShopLayout title='Checkout' pageDescription='Confirmar address'>
      <Typography variant='h1' component={'h1'}>
        Direccion
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField label='Nombre' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Apellido' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Dirección' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Dirección 2 (opcional)'
            variant='filled'
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Codigo postal' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Ciudad' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select variant='filled' label='País' value={1}>
              <MenuItem value={1}>Chile</MenuItem>
              <MenuItem value={2}>Perú</MenuItem>
              <MenuItem value={3}>Argentina</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label='Celular' variant='filled' fullWidth />
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }} display='flex' justifyContent={'center'}>
        <Button color='secondary' className='circular-btn' size='large'>
          Revisar pedido
        </Button>
      </Box>
    </ShopLayout>
  );
};

export default AddresPage;

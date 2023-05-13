import NextLink from 'next/link';
import {
  AppBar,
  Link,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Badge,
} from '@mui/material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';

export const Navbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Link
          component={NextLink}
          href='/'
          passHref
          underline='none'
          display='flex'
          alignItems='center'>
          <Typography variant='h6'>Teslo</Typography>
          <Typography sx={{ ml: 0.5 }}>Shop</Typography>
        </Link>

        <Box flex={1} />

        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <Link
            component={NextLink}
            href='/category/men'
            passHref
            underline='none'>
            <Button>Hombres</Button>
          </Link>
          <Link
            component={NextLink}
            href='/category/women'
            passHref
            underline='none'>
            <Button>Mujeres</Button>
          </Link>
          <Link
            component={NextLink}
            href='/category/kid'
            passHref
            underline='none'>
            <Button>Niños</Button>
          </Link>
        </Box>
        <Box flex={1} />

        <IconButton>
          <SearchOutlined />
        </IconButton>

        <Link
          component={NextLink}
          href='/cart'
          passHref
          underline='none'>
          <IconButton>
            <Badge badgeContent={2} color='secondary'>
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
        </Link>

        <Button>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};

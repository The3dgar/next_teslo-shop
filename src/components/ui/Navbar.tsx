import { useState } from 'react';
import { useRouter } from 'next/router';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';

import SearchOutlined from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import ClearOutlined from '@mui/icons-material/ClearOutlined';

import { useUiContext, useCartContext } from '@/context';
import { PageLink } from './PageLink';

export const Navbar = () => {
  const { asPath, push } = useRouter();
  const { toggleSideMenu } = useUiContext();
  const { numberOfItems } = useCartContext();

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (!searchTerm.trim().length) return;
    push(`/search/${searchTerm}`);
  };

  return (
    <AppBar>
      <Toolbar>
        <PageLink href='/' display='flex' alignItems='center'>
          <Typography variant='h6'>Teslo</Typography>
          <Typography sx={{ ml: 0.5 }}>Shop</Typography>
        </PageLink>

        <Box flex={1} />

        <Box
          sx={{
            display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' },
          }}
          className='fadeIn'>
          <PageLink href='/category/men'>
            <Button color={asPath === '/category/men' ? 'primary' : 'info'}>
              Hombres
            </Button>
          </PageLink>
          <PageLink href='/category/women'>
            <Button color={asPath === '/category/women' ? 'primary' : 'info'}>
              Mujeres
            </Button>
          </PageLink>
          <PageLink href='/category/kid'>
            <Button color={asPath === '/category/kid' ? 'primary' : 'info'}>
              Niños
            </Button>
          </PageLink>
        </Box>
        <Box flex={1} />

        {/* pantallas grandes */}
        {isSearchVisible ? (
          <Input
            sx={{
              display: { xs: 'none', sm: 'flex' },
            }}
            autoFocus
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
            placeholder='Buscar...'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            className='fadeIn'
            sx={{
              display: { xs: 'none', sm: 'flex' },
            }}
            onClick={() => setIsSearchVisible(true)}>
            <SearchOutlined />
          </IconButton>
        )}

        {/* pantallas pequeñas */}
        <IconButton
          sx={{
            display: {
              xs: 'flex',
              sm: 'none',
            },
          }}
          onClick={toggleSideMenu}>
          <SearchOutlined />
        </IconButton>

        <PageLink href='/cart'>
          <IconButton>
            <Badge
              badgeContent={numberOfItems > 9 ? '+9' : numberOfItems}
              color='secondary'>
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
        </PageLink>

        <Button onClick={toggleSideMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};

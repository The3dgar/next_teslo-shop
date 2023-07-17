import { useUiContext } from '@/context';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  PageLink,
} from '../ui';

export const AdminNavar = () => {
  const { toggleSideMenu } = useUiContext();

  return (
    <AppBar>
      <Toolbar>
        <PageLink href='/' display='flex' alignItems='center'>
          <Typography variant='h6'>Teslo</Typography>
          <Typography sx={{ ml: 0.5 }}>Shop</Typography>
        </PageLink>

        <Box flex={1} />

        <Button onClick={toggleSideMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};

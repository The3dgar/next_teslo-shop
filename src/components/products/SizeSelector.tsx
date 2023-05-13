import { ValidSizes } from '@/interfaces';
import { Button, Box } from '@mui/material';
import React from 'react';

interface Props {
  sizes: ValidSizes[];
  selectedSize?: ValidSizes;
}

export const SizeSelector = ({ selectedSize, sizes }: Props) => {
  return (
    <Box>
      {sizes.map((s) => (
        <Button
          key={s}
          size='small'
          color={selectedSize === s ? 'primary' : 'info'}>
          {s}
        </Button>
      ))}{' '}
    </Box>
  );
};

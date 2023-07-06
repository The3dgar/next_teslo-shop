import { ValidSizes } from '@/interfaces';
import { Button, Box } from '../ui';
import React from 'react';

interface Props {
  sizes: ValidSizes[];
  selectedSize?: ValidSizes;
  onSizeChange: (x:ValidSizes) => void;
}

export const SizeSelector = ({ selectedSize, sizes, onSizeChange }: Props) => {
  return (
    <Box>
      {sizes.map((s) => (
        <Button
          key={s}
          size='small'
          onClick={() => onSizeChange(s)}
          color={selectedSize === s ? 'primary' : 'info'}>
          {s}
        </Button>
      ))}{' '}
    </Box>
  );
};

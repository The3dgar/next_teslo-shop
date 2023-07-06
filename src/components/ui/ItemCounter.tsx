import React from 'react';
import { Box, IconButton, Typography } from './units';
import { AddCircleOutline, RemoveCircleOutline } from './icons';

interface Props {
  currentValue: number;
  updateQuantity: (q: number) => void;
  maxValue: number;
}

export const ItemCounter = ({
  currentValue,
  updateQuantity,
  maxValue,
}: Props) => {
  const handleChange = (q: number) => {
    const nextValue = currentValue + q;
    if (nextValue > 0 && nextValue <= maxValue) {
      updateQuantity(nextValue);
    }
  };
  return (
    <Box display={'flex'} alignItems={'center'}>
      <IconButton onClick={() => handleChange(-1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>
        {currentValue}
      </Typography>
      <IconButton onClick={() => handleChange(1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};

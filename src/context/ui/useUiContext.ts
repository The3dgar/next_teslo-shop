import React from 'react';
import { UiContext } from './UiContext';

export const useUiContext = () => {
  const context = React.useContext(UiContext);

  if (!context) {
    throw 'UI Provider must be defined';
  }

  return context;
};

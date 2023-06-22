import React from 'react';
import { AuthContext } from './AuthContext';

export const useAuthContext = () => {
 const context = React.useContext(AuthContext);

  if (!context) {
    throw 'Auth Provider must be defined';
  }

  return context;
};
import { useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';
import { UserService } from '@/services';
import { COOKIE_TOKEN_KEY, COOKIE_CART_KEY } from '@/utils/constans';
import { useRouter } from 'next/router';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const Auth_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);
  const router = useRouter();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const currentToken = Cookies.get(COOKIE_TOKEN_KEY);
    if (!currentToken) return;
    try {
      const { token, user } = await UserService.validate();
      Cookies.set(COOKIE_TOKEN_KEY, token);

      dispatch({ type: 'Auth login', payload: user });
    } catch (error) {
      Cookies.remove(COOKIE_TOKEN_KEY);
    }
  };

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { token, user } = await UserService.loginUser({ email, password });
      Cookies.set(COOKIE_TOKEN_KEY, token);

      dispatch({ type: 'Auth login', payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { token, user } = await UserService.registerUser({
        email,
        name,
        password,
      });
      Cookies.set(COOKIE_TOKEN_KEY, token);

      dispatch({ type: 'Auth login', payload: user });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: 'No se pudo crear el usuario',
      };
    }
  };

  const logout = () => {
    Cookies.remove(COOKIE_TOKEN_KEY);
    Cookies.remove(COOKIE_CART_KEY);

    router.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
        registerUser,
        logout
      }}>
      {children}
    </AuthContext.Provider>
  );
};

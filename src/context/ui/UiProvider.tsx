import { useReducer } from 'react';
import { UiContext, uiReducer } from './';

export interface UiState {
  isMenuOpen: boolean;
}

const Ui_INITIAL_STATE: UiState = {
  isMenuOpen: false,
};

interface Props {
  children: React.ReactNode;
}
export const UiProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(uiReducer, Ui_INITIAL_STATE);

  const toggleSideMenu = () => {
    dispatch({ type: 'Ui ToggleMenu' });
  };
  return (
    <UiContext.Provider
      value={{
        ...state,
        toggleSideMenu,
      }}>
      {children}
    </UiContext.Provider>
  );
};

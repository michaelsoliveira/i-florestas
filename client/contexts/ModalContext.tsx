import React, { createContext, ReactNode, useContext, useState } from 'react';

type ModalContextType = {
    modalState: {
        type?: string;
        message?: string;
        visible?: boolean;
        title?: string; 
        buttonText?: string; 
        styleButton?: string;
        className?: string;
    },
    openModal: (payload: any) => void;
    closeModal: () => void;    
}

type Props = {
    children: ReactNode
}

// context
const ModalContext = createContext({} as ModalContextType);

// Provider
const ModalProvider = ({ children }: Props) => {
  const [modalState, setState] = useState({ visible: false });

  const openModal = (payload: any) =>
    setState({ ...payload, visible: true });
  const closeModal = () => setState({ visible: false });

  return (
    <ModalContext.Provider
      value={{ modalState, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const useModalContext = () => {
  const context = useContext(ModalContext);
  return context;
};

export { useModalContext, ModalProvider };
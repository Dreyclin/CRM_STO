import React, { createContext, useContext, useState, ReactNode } from 'react';

// Типы для контекста
interface ModalContextType {
    isOpen: boolean;
    toggle: () => void
}

// Создаем контекст
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Хук для использования контекста
export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};

// Провайдер для управления состоянием модального окна
export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <ModalContext.Provider value={{ isOpen, toggle }}>
            {children}
        </ModalContext.Provider>
    );
};

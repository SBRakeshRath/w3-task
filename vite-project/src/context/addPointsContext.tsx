

import { createContext, useState, type ReactNode } from 'react'; 

interface AddPointsPanelContextType {
  isOpen: boolean;
  togglePanel: () => void;
}

const AddPointsPanelContext = createContext<AddPointsPanelContextType>({
  isOpen: false,
  togglePanel: () => {},
});

const AddPointsPanelProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <AddPointsPanelContext.Provider value={{ isOpen, togglePanel }}>
      {children}
    </AddPointsPanelContext.Provider>
  );
};

export { AddPointsPanelContext, AddPointsPanelProvider };
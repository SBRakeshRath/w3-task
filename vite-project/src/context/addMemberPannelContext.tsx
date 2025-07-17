

import { createContext, useState, type ReactNode } from 'react'; 

interface AddMemberPanelContextType {
  isOpen: boolean;
  togglePanel: () => void;
}

const AddMemberPanelContext = createContext<AddMemberPanelContextType>({
  isOpen: false,
  togglePanel: () => {},
});

const AddMemberPanelProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <AddMemberPanelContext.Provider value={{ isOpen, togglePanel }}>
      {children}
    </AddMemberPanelContext.Provider>
  );
};

export { AddMemberPanelContext, AddMemberPanelProvider };
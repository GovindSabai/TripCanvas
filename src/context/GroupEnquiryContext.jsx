import React, { createContext, useContext, useState } from 'react';

const GroupEnquiryContext = createContext();

export function GroupEnquiryProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openGroupEnquiry = () => setIsOpen(true);
  const closeGroupEnquiry = () => setIsOpen(false);

  return (
    <GroupEnquiryContext.Provider value={{ isOpen, openGroupEnquiry, closeGroupEnquiry }}>
      {children}
    </GroupEnquiryContext.Provider>
  );
}

export function useGroupEnquiry() {
  const context = useContext(GroupEnquiryContext);
  if (!context) {
    throw new Error('useGroupEnquiry must be used within a GroupEnquiryProvider');
  }
  return context;
}

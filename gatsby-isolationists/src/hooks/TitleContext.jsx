import React, { createContext, useMemo, useState, useContext } from 'react';

const defaultValue = {};
const TitleContext = createContext(defaultValue);

const TitleContextProvider = ({ children }) => {
  const [title, setTitle] = useState('Sporty T');
  const [subTitle, setSubtitle] = useState(false);
  const value = useMemo(
    () => ({
      title,
      subTitle,
      setPageTitle: setTitle,
      setSubtitle,
    }),
    [title, subTitle],
  );

  return <TitleContext.Provider value={value}>{children}</TitleContext.Provider>;
};

function useTitleContext() {
  const context = useContext(TitleContext);
  if (context === defaultValue) {
    throw new Error('useTitleContext must be used within TitleContextProvider');
  }
  return context;
}

export { useTitleContext, TitleContextProvider };

"use client";
import { createContext, useState } from "react";

export const shopContext = createContext<ShopContextProps>({
  search: "",
  setSearch: () => {},
  showSearch: false,
  setShowSearch: () => {},
});

interface ShopContextProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ShopContextProviderProps {
  children: React.ReactNode;
}

const ShopContextProvider = (props: ShopContextProviderProps) => {
  const [search, setSearch] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const value: ShopContextProps = {
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };

  return (
    <shopContext.Provider value={value}>{props.children}</shopContext.Provider>
  );
};

export default ShopContextProvider;

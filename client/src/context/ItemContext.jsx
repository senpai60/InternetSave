import { createContext, useContext, useEffect, useState } from "react";
import { getSavedItemsApi } from "../api/itemApi";

const ItemContext = createContext(null);

export const ItemProvider = ({ children }) => {
  const [savedItems, setSavedItems] = useState([]);

  const getSavedItems = async () => {
    try {
      const response = await getSavedItemsApi();
      setSavedItems(response.items);
    } catch (error) {
      console.error("Error fetching saved items:", error);
    }
  };

  useEffect(() => {
    getSavedItems();
  }, []);

  return (
    <ItemContext.Provider value={{ savedItems, getSavedItems }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItem = () => {
  return useContext(ItemContext);
};

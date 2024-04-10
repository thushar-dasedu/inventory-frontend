import { createContext, useContext,useState } from "react";

const AppContext = createContext();

const AppProvider =({ children })=>{

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
   
  };

  return  <AppContext.Provider value={{ cart, addToCart }}>{children}</AppContext.Provider>
}

//custom hook

const useProductContext=()=>{
    return useContext(AppContext);   
}

export { AppProvider ,AppContext ,useProductContext }       
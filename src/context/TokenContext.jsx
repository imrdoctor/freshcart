import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const TokenContext = createContext();

export default function TokenContextProvider(props) {
  const [UserToken, setUserToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setUserToken(token);
      try {
        const decoded = jwtDecode(token); 
        setDecodedToken(decoded);
        console.log(decoded);
        
        if(decodedToken){
            console.log(decodedToken);
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []); 

  return (
    <TokenContext.Provider value={{ UserToken, decodedToken }}>
      {props.children}
    </TokenContext.Provider>
  );
}

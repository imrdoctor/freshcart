import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const TokenContext = createContext();

export default function TokenContextProvider(props) {
  const [UserToken, setUserToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null); // State for decoded token

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setUserToken(token);
      try {
        const decoded = jwtDecode(token); // Decode the token
        setDecodedToken(decoded);
        if(decodedToken){
            console.log(decodedToken);
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <TokenContext.Provider value={{ UserToken, decodedToken }}>
      {props.children}
    </TokenContext.Provider>
  );
}

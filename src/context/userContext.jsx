import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider(props) {
  const [userlogin, setuserlogin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token !== null) {
      setuserlogin(token);
    }
  }, ); 

  return (
    <UserContext.Provider value={{ userlogin, setuserlogin }}>
      {props.children} 
    </UserContext.Provider>
  );
}

'use client';

import axios from "axios";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";

type PropsProvider = {
    children: ReactNode
}

type UserData = {
  id: string | number
  firstName: string
  lastName: string
  age: string
  gender: string
  email: string
  image: string
}



type UserContextType = {
  user: UserData | null;
  loading: boolean
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
};


export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}:PropsProvider) => {

    const [user, setUser] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {

      async function fetchUser(){

        const {data} = await axios.get("/api/auth/user");
        
        setUser(data.data);
        setLoading(false);
      }

      fetchUser();

    }, [])

    return (
        <UserContext.Provider value={{user, setUser, loading}}>
            {children}
        </UserContext.Provider>
    )

}

export function useUserContext(){

  const context = useContext(UserContext);

  if (!context) {
    throw new Error("Falha!");
  }

  return context;
}
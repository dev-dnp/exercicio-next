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
  refetch: () => Promise<void>
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}:PropsProvider) => {

    const [user, setUser] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {

          const {data} = await axios.get("/api/auth/user");

          setUser(data.data);

        } catch(e) {
          console.log(e)

        } finally {
          setLoading(false);
        }
    }

    useEffect(() => {
      fetchUser();
    }, [])

    const valueContext = {
      user,
      setUser,
      loading,
      refetch: fetchUser
    }

    return (
      <UserContext.Provider value={valueContext}>
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
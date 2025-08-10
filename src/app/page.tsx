"use client"

import { useUserContext } from "@/context/UserContext";


export default function Home() {

  const {user} =useUserContext()

  console.log(user)

  return (
    <h1>Hello {user?.lastName}</h1>
  );
}

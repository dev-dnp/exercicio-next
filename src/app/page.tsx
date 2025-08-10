"use client"

import { useUserContext } from "@/context/UserContext";


export default function Home() {

  window.location.href = "/login";

  return "Redirecionando você para o login...";
}

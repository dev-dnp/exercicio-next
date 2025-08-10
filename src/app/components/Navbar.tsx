"use client";

import clsx from "clsx";
import style from "./navbar.module.css";
import Link from "next/link";
import { useUserContext } from "@/context/UserContext";
import axios from "axios";


export default function NavBar(){

    const {user} = useUserContext();

    const fetchLogout = async () => {
        try {

            await axios.post("/api/auth/logout");
            
            window.location.href = "/login";

        } catch(e) {
            console.log(e)
        }
    }

    return (
        <>
            <header className={style.header}>
                <div className={clsx("container", style.myContainer)}>
                    <div className="logo">LOGO</div>

                    <div className={style.boxMenu}>
                        <nav className={style.menu}>
                            <ul>
                                <li>
                                    <Link href="/dashboard">Home</Link>
                                </li>

                                <li>
                                    <Link href="/dashboard/produtos">Produtos</Link>
                                </li>
                            </ul>
                        </nav>

                        <div className={style.menu}>
                            <a href="" className={style.username}>Olá, {user?.firstName}</a> | 
                            <button onClick={fetchLogout} className={style.linkLogout}> Sair</button>
                        </div>
                    </div>
                </div>
           </header>
        </>
    );
}
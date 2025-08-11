"use client"

import Link from "next/link";
import style from  "./dashboard.module.css";
import clsx from "clsx";
import { useUserContext } from "@/context/UserContext";
import LoadingPage from "@/app/components/LoadingPage";

export default function Home(){

    const {user, loading} = useUserContext();

    if(loading) return <LoadingPage>Entrando...</LoadingPage>;

    return (
        <div>
            <div className={clsx("container", style.home)}>

                <h1 className={style.hello}>
                    Olá {" "}
                    <span className={style.name}>
                        {user?.firstName} {user?.lastName}
                    </span>!
                </h1>
            
                <div style={{textAlign: "center"}}>
                    <Link href="/dashboard/produtos">Ver produtos</Link>
                </div>
            </div>
        </div>
    );
}
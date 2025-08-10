"use client"

import Link from "next/link";
import style from  "./dashboard.module.css";
import clsx from "clsx";
import { useUserContext } from "@/context/UserContext";

export default function Home(){

    const {user, loading} = useUserContext();

    return (
        <div>
            <div className={clsx("container", style.home)}>


                {loading && <img width={100} src="/loading-gif.gif" />}

                {!loading && (
                    <h1 className={style.hello}>
                        Olá 
                        <span className={style.name}>
                           {" "} {user?.firstName} {user?.lastName}
                        </span>!
                    </h1>
                )}

                
            
                <div style={{textAlign: "center"}}>
                    <Link href="/dashboard/produtos">Ver produtos</Link>
                </div>
            </div>
        </div>
    );
}
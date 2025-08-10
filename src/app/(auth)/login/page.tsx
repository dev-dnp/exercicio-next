"use client";

import axios from "axios";
import style from "./page.module.css";
import { useForm } from "react-hook-form";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type FormData = {
    username: string;
    password: string
};

export default function Login(){

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>();
    
    const {user, setUser} = useUserContext();
    const [loadingLogin, setLoadingLogin] = useState(false);
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [erro, setErro] = useState("");

    const onSubmitLogin = async (data: FormData) => {

        setLoadingLogin(true)
        
        try {
            const authUser = await axios({
                method: 'post',
                url: '/api/auth/login',
                data
            });

            setErro("")

            if (authUser.data.token) {
                window.location.href = "/dashboard";
            }
            
        } catch(error) {
            setErro("Usuario ou senha incorreta! Tente novamente")
            
        } finally   {
            setLoadingLogin(false);
        }

    }


    useEffect(()=> {

        setIsClient(true)

        async function getUser(){
            if(user?.id){
                router.push("/dashboard")
            } else {
                setUser(null);
            }
        }

        getUser()
    }, [user])

    if(!isClient){
        return <p>Aguarde...</p>
    }

    return(
        <div className={style.boxForm}>
 
            <form onSubmit={handleSubmit(onSubmitLogin)} className={style.form}>

                {erro}

                <div className={style.boxInput}>
                    <label htmlFor="">Usuário </label>
                    <input {...register("username", {required: true})} type="text" placeholder="Seu usuario"/>
                </div>
                 <div className={style.boxInput}>
                    <label htmlFor="">Senha </label>
                    <input {...register("password", {required: true})} type="text" placeholder="Sua senha"/>
                </div>

                <button disabled={loadingLogin}>Entrar</button>
            </form>

            {loadingLogin && (
                <div className={style.loadingText}>
                    <img src="/loading-gif.gif" width={50} />
                    <p>Aguarde um momento</p>
                </div>
            )}
        </div>
    );
}


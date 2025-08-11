"use client";

import axios from "axios";
import style from "./page.module.css";
import { useForm } from "react-hook-form";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingPage from "@/app/components/LoadingPage";

interface IFormData {
    username: string
    password: string
};

export default function Login(){

    const {register, handleSubmit} = useForm<IFormData>();
    const {user, loading} = useUserContext();
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    const onSubmitLogin = async (dataForm: IFormData) => {

        setLoadingLogin(true);
        setError("");
        
        try {
            const { data } = await axios.post(
                
                "/api/auth/login", 
                {...dataForm}
            );

            if (data.success && data.payload.user.accessToken){
                return window.location.href = "/dashboard";
            }
                        
        } catch(error) {
            setError("Usuario ou senha incorreta! Tente novamente")
            
        } finally   {
            setLoadingLogin(false);
        }

    }


    useEffect(()=> {
        if(!loading){
            if(user?.id){
                router.push("/dashboard");
            }
        }
    }, [user, loading, router])

    
    if(loading) return <LoadingPage>Aguarde uns segundos...</LoadingPage>;

    return(
        <div className={style.boxForm}>
 
            <form onSubmit={handleSubmit(onSubmitLogin)} className={style.form}>

                {error && <span className={style.errorTop}>{error}</span>}

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

            {loadingLogin && (<LoadingPage>Autenticando...</LoadingPage>)}
            
        </div>
    );
}


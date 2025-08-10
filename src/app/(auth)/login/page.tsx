"use client";

import axios from "axios";
import style from "./page.module.css";
import { useForm } from "react-hook-form";
import { useUserContext } from "@/context/UserContext";

type FormData = {
    username: string;
    password: string
};

export default function Login(){

    const {register, handleSubmit, formState: {errors}} = useForm<FormData>();

    const onSubmitLogin = async (data: FormData) => {
        const authUser = await axios({
            method: 'post',
            url: '/api/auth/login',
            data
        });

        console.log(authUser)
    }

    const {user} = useUserContext();

    return(
        <div className={style.boxForm}>
            
            <form onSubmit={handleSubmit(onSubmitLogin)} className={style.form}>
                <div className={style.boxInput}>
                    <label htmlFor="">Usuário </label>
                    <input {...register("username", {required: true})} type="text" placeholder="Seu usuario"/>
                </div>
                 <div className={style.boxInput}>
                    <label htmlFor="">Senha </label>
                    <input {...register("password", {required: true})} type="text" placeholder="Sua senha"/>
                </div>

                <button>Entrar</button>
            </form>
        </div>
    );
}


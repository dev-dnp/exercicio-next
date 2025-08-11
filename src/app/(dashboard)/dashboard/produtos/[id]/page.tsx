
import { getSingleProducts } from "@/lib/api";
import style from "./page.module.css";
import Image from "next/image";
import { DollarSign } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
    params: Promise<{
        id: string
    }>
}


export default async function PageProdutos({ params }:Props){

    const { id } = await params;

    if(isNaN(Number(id))) return redirect("/dashboard/produtos");

    const product = await getSingleProducts(Number(id));

    return (
        <div>
           <div className="container">
                <header>
                    <h1 className={style.titleProdutos}> Detalhes do Produto </h1>
                </header>
                
                {!product
                ? <p style={{textAlign: "center"}}>Produto não encontrado!</p>
                : (<div>
                    {product.id && (
                        <div className={style.myProduct}>
                            <div className={style.image}>
                                <Image src={product.images[0]} width={200} height={200} alt={product.title} />
                            </div>

                            <div className={style.details}>
                                <ul>
                                    <li className={style.detailsName}>
                                        {product.title}
                                    </li>


                                    <li className={style.detailsCategory}>
                                        {product.category}
                                    </li>

                                    <li className={style.detailsDescription}>
                                        {product.description}
                                    </li>


                                    <li className={style.detailsPrice}>
                                        <DollarSign />
                                        {product.price}
                                    </li>
                                </ul>

                                <Link href={`/dashboard/produtos`}>Voltar aos produtos</Link>
                            </div>
                        </div>
                    )}

                </div>)}
           </div>
        </div>
    );
}
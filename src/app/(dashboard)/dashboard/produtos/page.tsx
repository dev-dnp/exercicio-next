
import { getAllProducts } from "@/lib/api";
import style from "./page.module.css";
import Image from "next/image";
import { DollarSign } from "lucide-react";
import Link from "next/link";

export default async function PageProdutos(){

    const products = await getAllProducts();

    return (
        <div>
           <div className="container">
                <header><h1 className={style.titleProdutos}>Produtos</h1></header>

                <div>
                    {products.map(product => 
                        <div className={style.myProduct} key={product.id}>
                            <div className={style.image}>
                                <Image src={product.images[0]} width={200} height={200} alt="" />
                            </div>

                            <div className={style.details}>
                                <ul>
                                    <li className={style.detailsName}>
                                        {product.title}
                                    </li>


                                    <li className={style.detailsPrice}>
                                        <DollarSign />
                                        {product.price}
                                    </li>
                                </ul>

                                <Link href={`/dashboard/produtos/${product.id}`}>Ver detalhes</Link>
                            </div>
                        </div>
                    )}

                </div>
           </div>
        </div>
    );
}
import { api } from "./axios";

interface IDataProducts {
    products: IProducts[]
}

interface IProducts {

    id: string | number
    title: string
    description: string 
    category: string
    price: string | number
    images: string[]
    
}

export async function getAllProducts(){

    const { data } = await api.get<IDataProducts>('/products');

    return data.products;
}

export async function getSingleProducts(id: number){

    try{
        const { data } = await api.get<IProducts>(`/products/${id}`);
        return data;
    }
    catch {
        return null;
    }
}
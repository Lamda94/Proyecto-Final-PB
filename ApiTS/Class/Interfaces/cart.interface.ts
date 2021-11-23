import { IProduct } from './productClass.Interface';
export interface ICart{
    _id: any,      
    timestamp: any,
    products: IProduct[],
}

export interface ICartClass{
    getCart(): Promise<ICart[]>

    AddToCart(data:any):  Promise<ICart[]>

    RemoveToCart(id:any):  Promise<ICart[]>
}
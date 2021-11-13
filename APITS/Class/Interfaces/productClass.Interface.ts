export interface IProduct{
    id: any,        
    name: string,
    description: string,
    code: number,
    picture: string,
    price: number,
    stock: number,
}

export interface IProductsClass{
    getProduct(id:any): Promise<IProduct[]>

    saveProduct(data:any):  Promise<IProduct[]>

    deleteProduct(id:any):  Promise<IProduct[]>

    updateProduct(data:any, id:any):  Promise<IProduct[]>

    filter(filter:Object):  Promise<IProduct[]>
}
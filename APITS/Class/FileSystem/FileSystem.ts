import { IProduct, IProductsClass } from '../Interfaces/productClass.Interface';
import { promises } from 'fs';
const { readFile, writeFile } = promises;
const url = __dirname.replace("\\Class\\FileSystem","\\data\\products.json");

class Product implements IProductsClass{
    private fileName:string = "";
    constructor(name:string){
        this.fileName=name;
    }

    async getProduct(id:any=false): Promise<IProduct[]>{
        try {
            const data:any =  await readFile(this.fileName); 
            const p = JSON.parse(data);
            const products: IProduct[] = p[0].products;
            if (products.length == 0) {
                return [];
            }
            if (!id) {
                return products;
            } else {
                const product:any = products.find(p=>p.id==id);
                if (product) {
                    const data: IProduct = {
                            id: product.id,        
                            name:product.name,
                            description:product.description,
                            code: Number(product.code),
                            picture:product.picture,
                            price: Number(product.price),
                            stock: Number(product.stock),
                        };
                    return [data];
                }
                return [];
            }     
        } catch (error) {
            return []
        }    
    }

    async saveProduct(data:any): Promise<IProduct[]>{
        try {
            const products:IProduct[] = await this.getProduct();
            let id = 1
            if (products.length > 0) {
                id = Number(products[products.length-1].id)+1;  
            }           
            data.id=id;    
            products.push(data);  
            await this.write(products);
        } catch (error) {
            throw {status: 500, menssage: "Error de base de datos", error};
        }    
        return [data];
    }

    async deleteProduct(id:any): Promise<IProduct[]>{
        try {
            let products: IProduct[] = await this.getProduct();
            const deleted: IProduct[] = await this.getProduct(id);
            if (deleted.length == 0) {
                return [];
            }else{
                const productsUpdated: IProduct[] = products.filter(p=>p.id!=id); 
                products = productsUpdated;
                await this.write(products);
                return deleted;
            }            
        } catch (error) {
            throw {status: 500, menssage: "Error de base de datos", error};
        }    
    }

    async updateProduct(data: any, id: any): Promise<IProduct[]>{        
        try {
           let products: IProduct[] = await this.getProduct();
           data.id = id;
            const updated = await this.getProduct(id);
            if (updated.length == 0) {
                return []
            } 
            const d: IProduct[] = products
            .map((product:IProduct) => {
                if(product.id == id){
                    return data;
                }else{
                    return product;
                }
            });            
            products = d;        
            await this.write(products);
            return [data];    
        } catch (error) {
            throw {status: 500, menssage: "Error de base de datos", error};
        }            
    }
    
    async filter(filter:any={}): Promise<IProduct[]>{
        const data = await this.getProduct();
        if (data.length == 0) {
            return [];
        }

        if ("name" in filter) {
            const dataFilter = data.filter(d=>d.name === filter.name);  
            return dataFilter;
        }

        if ("code" in filter) {
            const dataFilter = data.filter(d=>d.code == filter.code)
            return dataFilter;
        }

        if ("price" in filter) {
            const dataFilter = data.filter(d=>d.price > parseInt(filter.price.from) && d.price < parseInt(filter.price.to))
            return dataFilter;
        }
        
        if ("stock" in filter) {
            const dataFilter = data.filter(d=>d.stock > parseInt(filter.stock.from) && d.stock < parseInt(filter.stock.to))
            return dataFilter;
        }

        return data;
    }

    async write(d:IProduct[]){
        try {
            const data:any =  await readFile(this.fileName); 
            let p = JSON.parse(data);
            p[0].products = d;
            await writeFile(this.fileName, JSON.stringify(p));
        } catch (error) {
            throw {status: 500, menssage: "Error escribiendo los datos en el json", error};
        }
    }
}

console.log(url);
const product = new Product(url);

module.exports = {product};
import { IProduct, IProductsClass } from '../Interfaces/productClass.Interface';
import firebaseAdmin from 'firebase-admin';
const serviceAccount = require("./db/ecommerce-ch-30b8e-firebase-adminsdk-flbpr-e10a2c17b5.json");
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://ecommerce-ch-30b8e.firebaseio.com",
});

const firestoreAdmin = firebaseAdmin.firestore();
const collection = firestoreAdmin.collection("ecommers");

class Product implements IProductsClass{
    
    constructor(){}

    async getProduct(id:any =false): Promise<IProduct[]>{
                
        if (id !== false) {
            const doc:any = await collection.doc(id.toString()).get();
            if (!doc.exists) {
                return [];
            } else {
                const d = doc.data();
                const data = {id:doc.id, ...d};
                return [data];
            } 
        }
        const queryGet:any = await collection.get();
        const data = queryGet.docs.map((doc:any)=>{
            const d = doc.data();
            const response = {
                id:doc.id,
                name: d.name,
                description: d.description,
                code: d.code,
                picture: d.picture,
                price: d.price,
                stock: d.stock,
            };
            return response;
        });
        if (data.length == 0) {
            return [];
        }
        return data;
    }

    async saveProduct(data:any): Promise<IProduct[]>{
        try {
            let id = 1;
            const d = await this.getProduct();
            if(d.length > 0){
                id = (parseInt(d[d.length-1].id)+1);
            }
            await collection.doc(id.toString()).create(data);
            const i:number = id;
            const da: IProduct = {
                id,
                name: data.name,
                description: data.description,
                code: data.code,
                picture: data.picture,
                price: data.price,
                stock: data.stock,
            }
            return [da];
        } catch (err) {            
            throw {status: 500, menssage: "Error de base de datos", error:err};
        }
    }

    async deleteProduct(id:any): Promise<IProduct[]>{
        try {
            const response: IProduct[] = await this.getProduct(id);
            if (response.length == 0) {
                return [];
            }
            await collection.doc(id).delete();
            return response;
        } catch (error) {
            throw {status: 500, menssage: "Error de base de datos", error};
        }
    }

    async updateProduct(data: any, id:any): Promise<IProduct[]>{        
        try {
            const d: IProduct[] = await this.getProduct(id);
            if (d.length == 0) {
                return [];
            }
            await collection.doc(id).update(data);
            const response: IProduct[] = await this.getProduct(id);
            return response;
        } catch (err) {
            throw {status: 500, menssage: "Error de base de datos", error:err};
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
}

const product = new Product();

module.exports = { product };
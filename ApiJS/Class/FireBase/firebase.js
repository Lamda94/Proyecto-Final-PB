const firebaseAdmin = require('firebase-admin');
const serviceAccount = require("./db/ecommerce-ch-30b8e-firebase-adminsdk-flbpr-e10a2c17b5.json");
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://ecommerce-ch-30b8e.firebaseio.com",
});

class Product {
    constructor(){
        const firestoreAdmin = firebaseAdmin.firestore();
        this.collection = firestoreAdmin.collection("ecommers");
    }

    async getProduct(id=false){
        if (id !== false) {
            const queryGet = await this.collection.doc(id.toString()).get();
            const data = queryGet.docs.map(doc=>{
                const d = doc.data();
                return{
                    id:doc.id,
                    name: d.name,
                    description: d.description,
                    code: d.code,
                    picture: dadta.picture,
                    price: d.price,
                    stock: d.stock,
                }
            })
            return data;
        }
        const queryGet = await this.collection.get();
        const data = queryGet.docs.map((doc)=>{
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
        return data;
    }

    async saveProduct(data){
        try {
            let id = 1;
            const d = await this.getProduct();
            if(d.length > 0){
                id = (parseInt(d[d.length-1].id)+1);
            }
            const response = await this.collection.doc(id.toString()).create(data);
            return response;
        } catch (err) {
            console.log(err);
           return err
        }
    }

    async deleteProduct(id){
        try {
            const doc = await collection.doc(id).delete();
            return doc;
        } catch (error) {
            
        }
    }

    async updateProduct(data, id){        
        try {
            const doc = await collection.doc(id).update(data);
            return doc;
        } catch (err) {
            return err;
        }
    }

    async filter(filter={}){
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
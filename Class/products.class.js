const {promises} = require('fs');
const {readFile,writeFile} = promises;
const url = __dirname.replace("\\Class","\\data\\products.json");

class Product {
    constructor(name){
        this.fileName=name;
        this.products = [];
    }

    async getProduct(id=false){
        try {
            const data =  await readFile(this.fileName); 
            const p = JSON.parse(data);
            this.products = p[0].products;
            if (!id) {
                return this.products;
            } else {
                const product = this.products.find(p=>p.id==id);
                if (product == undefined) {
                    return [];
                }
                return product;
            }     
        } catch (error) {
            return []
        }    
    }

    async saveProduct(data){
        try {
            this.products = await this.getProduct();
            let id = 1
            if (this.products.length > 0) {
                id = this.products[this.products.length-1].id+1;  
            }           
            data.id=id;    
            this.products.push(data);  
            await this.write(this.products);
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }    
        return data;
    }

    async deleteProduct(id){
        try {
            this.products = await this.getProduct();
            const deleted = await this.getProduct(id);
            if (deleted.length == 0) {
                return [];
            }
            const productsUpdated = this.products.filter(p=>p.id!=id); 
            this.products = productsUpdated;
            await this.write(this.products);
            return deleted;
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }    
    }

    async updateProduct(data){        
        try {
            this.products = await this.getProduct();
            const id = data.id;
            const d = this.products
            .map(product => {
                if(product.id == id){
                    return data;
                }else{
                    return product;
                }
            });
            this.products = d;        
            await this.write(this.products);
            return this.products.find(p=>p.id == id);  
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }            
    }

    async write(d){
        try {
            const data =  await readFile(this.fileName); 
            let p = JSON.parse(data);
            p[0].products = d;
            await writeFile(this.fileName, JSON.stringify(p));
        } catch (error) {
            
        }
    }
}

const product = new Product(url);

module.exports = {product};
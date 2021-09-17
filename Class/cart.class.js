const {promises} = require('fs');
const {readFile,writeFile} = promises;
const url = __dirname.replace("\\Class","\\data\\products.json");

class Cart {
    constructor(name){
        this.fileName=name;
        this.cart = []
    }

    async getCart(id=false){
        try {
            const data =  await readFile(this.fileName); 
            const p = JSON.parse(data);
            this.cart = p[0].cart;
            if (!id) {
                return this.cart;
            } else {
                const carts = this.cart.find(p=>p.id==id);
                if (carts == undefined) {
                    return [];
                }
                return carts;
            }     
        } catch (error) {
            return []
        }       
    }

    async addCart(data){   
        try {
            this.cart = await this.getCart();
            let id = 1
            const d = {
                timestamp: Date.now(),
                product: data,
            }
            if (this.cart.length > 0) {
                id = this.cart[this.cart.length-1].id+1;  
            }
            d.id = id;
            console.log(d);
            this.cart.push(d);
            console.log(this.cart);
            
            await this.write(this.cart);
            return d;
        } catch (error) {
            console.log(error.message);
        } 
    }

    async deleteCart(id){
        try {
            const deleted = this.getCart(id);
            if (deleted.length == 0) {
                return [];
            }
            const cartUpdated = this.cart.filter(p=>p.id!=id); 
            this.cart = cartUpdated;
            await this.write(this.cart);
            return deleted;
        } catch (error) {
            console.log(error.menssage);
        }
    }

    async write(d){
        try {
            const data =  await readFile(this.fileName); 
            let p = JSON.parse(data);
            p[0].cart = d;
            await writeFile(this.fileName, JSON.stringify(p));
        } catch (error) {
            
        }
    }
}

const cart = new Cart(url);

module.exports = {cart};
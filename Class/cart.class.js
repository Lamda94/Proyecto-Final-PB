class Cart {
    constructor(){
        this.cart = []
    }

   getCart(id=false){
       if (!id) {
            const data = this.cart;
            return data;
       }else{
            const data = this.cart.find(p=>p.id==id);
            if (data == undefined) {
                return [];
            }
            return data;
       }      
    }

    addCart(data){    
        let id = 1
        const d = {
            timestamp: Date.now(),
            product: data,
        }
        if (this.cart.length > 0) {
            id = this.cart[this.cart.length-1].id+1;  
        }
        d.id = id;
        this.cart.push(d)
        return d;
    }

    deleteCart(id){
        const deleted = this.getCart(id);
        if (deleted.length == 0) {
            return [];
        }
        const cartUpdated = this.cart.filter(p=>p.id!=id); 
        this.cart = cartUpdated;
        return deleted;
    }
}

const cart = new Cart();

module.exports = {cart};
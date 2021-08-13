class Product {
    constructor(){
        this.products = []
    }

    getProducts(){
        return this.products;
    }

   getProduct(id){        
        const product = this.products.find(p=>p.id==id);
        if (product == undefined) {
            return [];
        }
        return product;
    }

    saveProduct(data){
        let id = 1
        if (this.products.length > 0) {
            id = this.products[this.products.length-1].id+1;  
        }           
        data.id=id;    
        this.products.push(data);
        return data;
    }
}

const product = new Product();

export default product;
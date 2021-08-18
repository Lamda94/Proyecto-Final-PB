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

    deleteProduct(id){
        const deleted = this.getProduct(id);
        if (deleted.length == 0) {
            return [];
        }
        const productsUpdated = this.products.filter(p=>p.id!=id); 
        this.products = productsUpdated;
        return deleted;
    }

    updateProduct(dat){
        const data = dat.data;
        const id = Number(dat.id);
        data.id = id;
        const d = this.products
        .map(product => {
            if(product.id == id){
                return data;
            }else{
                return product;
            }
        });
        this.products = d;
        return this.products.find(p=>p.id == id);        
    }
}

const product = new Product();

export default product;
class Product {
    constructor(){
        this.products = []
    }

    getProducts(){
        if (this.products.length == 0) {
            return({status:400, data:{error:"No hay productos cargados"}});
        } else {
            return({status:200, data:this.products});
        }
    }

   getProduct(id){
        if (this.products.length == 0) {
            return({status:400, data:{error:"No hay productos cargados"}});
        } else {
            const product = this.products.find(p=>p.id==id);
            if (product == undefined) {
                return({status:400, data:{error:"Producto no encontrado"}});
            }
            return({status:200, data:product});
        }
    }

    saveProduct(data){
        let id = 1
        if (this.products.length > 0) {
            id = this.products[this.products.length-1].id+1;  
        }           
        data.id=id;    
        this.products.push(data);
        return({status:200, data});
    }
}

const product = new Product();

export default product;
import express from 'express';
import product from "./products.class.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/api/products/list",(req,res)=>{ 
    const response = product.getProducts()
    res.status(response.status).json(response.data);
});

app.get("/api/products/list/:id", (req,res)=>{
    const id = req.params.id;
    const response = product.getProduct(id);
    res.status(response.status).json(response.data);
});

app.post("/api/products/save",(req,res)=>{ 
    const data = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }
    const response = product.saveProduct(data);
    res.status(response.status).json(response.data);

});

const PORT =8080
const server = app.listen(PORT,()=>console.log(`App is running on port ${PORT}`));
server.on("error", err=>console.log(`Error on server: ${err}`));
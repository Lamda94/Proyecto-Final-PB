const faker = require('faker');

exports.listTest = (req, res) => {
    const products = [];
    const cant = Number(req.query.cant);
    const cantidadAGenerar = isNaN(cant) ? 10 : cant;
    for (let i = 0; i < cantidadAGenerar; i++) {
        products.push({
            id: faker.datatype.number(),        
            name: faker.commerce.productName(),
            description: faker.lorem.sentence(),
            code: faker.datatype.number(),
            picture: faker.internet.url(),
            price: faker.datatype.number(),
            stock: faker.datatype.number(),
        })    
    }

    if (cant == 0) {
        res.status(401).json([]);
    }else{
        res.status(200).json(products);
    }    
}
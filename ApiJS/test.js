
const array = []
for (let i=0; i < 10; i++) {
    console.log("ingreso");
    array.push({        
        name: "Producto "+(i+1),
        description: "Description producto "+(i+1),
        code: (i+1),
        picture: "url",
        price: Math.round(Math.random() * (5000 - 100) + 100),
        stock: Math.round(Math.random() * (100 - 1) + 1),
    })
}

console.log(array);

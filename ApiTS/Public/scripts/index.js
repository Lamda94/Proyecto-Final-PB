const ioSocket = io();
const listProduct = Handlebars.compile(`
<div class="col-8 bg-dark p-5 mb-5">
    <h1 class="text-center text-light">Product List</h1>
    <div >
        {{#if data.length}}
            <table class="table table-light table-striped text-center">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Thumbnail</th>
                    </tr>
                </thead>
                <tbody>
                    {{#each data}}
                        <tr>
                            <td>{{name}}</td>
                            <td>{{price}}</td>
                            <td><img src="https://firebasestorage.googleapis.com/v0/b/hg-store-293e9.appspot.com/o/product.png?alt=media&token=5ef8328d-6062-4d30-956b-9a780e83c0a8" class="card-img-top" alt="..." style="width: 30px;"></td>
                        </tr>
                    {{/each}}
                </tbody>
                <tfoot>
                    <tr>
                        <td>Title</td>
                        <td>Price</td>
                        <td>Thumbnail</td>
                    </tr>
                </tfoot>
            </table>
        {{else}}
            <div class="alert alert-warning" role="alert">Produsts not found.</div>
        {{/if}}
    </div>
</div>
`);

ioSocket.on("productList", (data)=>{
    const lista = listProduct({data});
    console.log(data);
    const div = document.getElementById("List");
    div.innerHTML = lista;
});

const newProduct = ()=>{
    console.log("ingreso");
    const url = "http://localhost:8080/products/add";
    const data = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        code: document.getElementById("code").value,
        picture: document.getElementById("picture").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value,
    }
    console.log(data);
    fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers:{ 'Content-Type': 'application/json'  }
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => window.location.href = "/login");
}
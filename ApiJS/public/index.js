const ioSocket = io();
const listProduct = Handlebars.compile(`
<div class="col-8 bg-light p-5 mb-5">
    <h1 class="text-center">Product List</h1>
    <div >
        {{#if data.length}}
            <table class="table table-dark table-striped text-center">
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
                            <td>{{title}}</td>
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
`)

ioSocket.on("new-product",(data)=>{
    const lista = listProduct(data);
    document.getElementById("List").innerHTML = lista;
});

//const listProduct= 
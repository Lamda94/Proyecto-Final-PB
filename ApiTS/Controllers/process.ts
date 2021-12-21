//process genete n numbers ramdon
let randoms:any = {};
process.on("message", (cantidad:any) => {
    console.log("cantidad: ", cantidad);
    

    for (let i = 0; i < cantidad; i++) {
        const randomsNumber = Math.floor(Math.random() * (1000 - 1)) + 1;
        if (randoms[randomsNumber]) {
            randoms[randomsNumber]++;
        }else{
            randoms[randomsNumber] = 1;
        }
    }
    
    process.send(randoms);
});
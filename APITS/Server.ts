const PORT:any = process.argv[2] || 8080;
const clust = process.argv[3] || "FORK";

if(clust === "FORK"){
  const {server} = require("./Server.config.js");
  server.listen(PORT, ()=>console.log(`App start on http://localhost:${PORT} - PID:${process.pid}`));  
  server.on("error", (err:object)=>console.log(`Error on server: ${err}`));
}else if(clust === "CLUSTER"){
  const cluster = require('cluster');
  const cpus = require('os').cpus().length;
  const {server} = require("./Server.config.js");
  if(cluster.isMaster){
    console.log(`Master ${process.pid} is running`);
    for(let i = 0; i < cpus; i++){ 
      cluster.fork();
    }

    cluster.on("online", (worker:any)=>{
      console.log(`Worker ${worker.process.pid} is online`);
    });
  }else{
    server.listen(PORT, ()=>console.log(`App start on http://localhost:${PORT} PID:${process.pid}`));  
    server.on("error", (err:object)=>console.log(`Error on server: ${err}`));
  }
}
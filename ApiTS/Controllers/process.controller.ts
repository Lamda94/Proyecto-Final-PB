import { fork } from 'child_process';

exports.process = function(req:any, res:any) {  
    const path = __dirname + '/process.js';
    const child = fork(path);
    const cantidad = req.query.cant || 100000000;
    child.send(cantidad);
    child.on("message", (randoms:any) => {
        res.status(200).json(randoms);
    });
}
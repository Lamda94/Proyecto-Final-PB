const cpus = require('os').cpus().length;

const  getInfo = (req:any, res:any) => {
    const data = {
        argv: process.argv.slice(2) || null,
        platform: process.platform,
        version: process.version,
        memoria:  JSON.stringify(process.memoryUsage()),
        path: process.cwd(),
        id: process.pid,
        cpus: cpus,
    };

    res.render('info.pug', data);
};

module.exports= { getInfo };
exports.notFound = (req:any, res:any, next:any) => {
    return res.status(404).send({error:-2, description: `Route ${req.url} method ${req.method} It's not implemented.` });
};

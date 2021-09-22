const options = {
    client: "sqlite3",
    connection: {
      filename: "../db/menssages.sqlite",
    },
    useNullAsDefault: true,
};
  
module.exports = {
    options,
};
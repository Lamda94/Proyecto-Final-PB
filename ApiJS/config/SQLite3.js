const options2 = {
    client: "sqlite3",
    connection: {
      filename: "./db/menssages.sqlite",
    },
    useNullAsDefault: true,
  }

  const options = {
    client: "sqlite3",
    connection: {
      filename: "./db/ecommerce.sqlite",
    },
    useNullAsDefault: true,
  }
module.exports ={options, options2}
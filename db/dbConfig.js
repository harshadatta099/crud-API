// db/dbConfig.js

const sql = require("mssql/msnodesqlv8");

const config = {
    connectionString: "Driver={SQL Server};Server=DESKTOP-0K3M0I4\\SQLEXPRESS;Database=products;Trusted_Connection=yes;",
};

const pool = new sql.ConnectionPool(config);

// Initialize connection pool
pool.connect()
    .then(() => {
        console.log("Connected to MSSQL database");
    })
    .catch((err) => {
        console.error("Failed to connect to MSSQL", err);
    });

module.exports = pool;

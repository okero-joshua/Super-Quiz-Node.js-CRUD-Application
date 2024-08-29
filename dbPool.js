const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "xefi550t7t6tjn36.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "xkt2rd8jspp540qv",
    password: "lg36sc7uhnqrpc53",
    database: "m2qmrpzqz1yvzazf",
});

module.exports = pool;

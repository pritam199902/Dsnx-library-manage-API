module.exports ={
    db : {
        dbname : "mylibrary",
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        host : process.env.DB_HOST,
        dialect : "mysql",
        pool : {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    },
}
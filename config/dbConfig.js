module.exports ={
    db : {
        dbname : "mylibrary",
        user : "root",
        password : "root",
        host : "localhost",
        dialect : "mysql",
        pool : {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    }
}
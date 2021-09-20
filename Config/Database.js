const mysql = require("mysql");

const redis = require("redis")

RedisConnect = ()=>{
  try{
    let redis_client = redis.createClient({
      url:process.env.REDIS_URL
    })
    console.log("REDIS Cache has been initiated successfully!")
    redis_client.on("error", error=> {
      console.error(error);
    });
    return redis_client
  }catch(err){
    console.log(err.message)
    return null
  }
}

const pool = mysql.createPool({

  connectionLimit:1000,
  host    : process.env.DB_HOST,
  user    : process.env.DB_USER,
  password: process.env.DB_PASS,
  port    : process.env.DB_PORT,
  database: process.env.DB_NAME,
  multipleStatements: true

});

module.exports = pool;


let cache = RedisConnect()

module.exports = {pool, cache}
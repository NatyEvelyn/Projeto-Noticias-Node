//npm install pg
const { Pool } = require("pg");

const client = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://geomskhbgdrlpg:6b87ad37e4b78ae58ff4d1818c2a8f198a1c43f510cf197d4b121d312aa8d4f1@ec2-52-206-182-219.compute-1.amazonaws.com:5432/ddhkmflkfcmkr8",
  ssl: {
    rejectUnauthorized: false,
  },
});

//teste de conexão

//async function connectTeste(){
//    const res= await client.query('SELECT $1::TEXT AS MESSAGE',['Olá mundo'],(err,result)=>{
//        console.log(result.rows[0].message)
//    })
//}

//connectTeste()
module.exports = client;

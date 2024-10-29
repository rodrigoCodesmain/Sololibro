const { MongoClient } = require ("mongodb");

const getConnection=async ()=>{

    try{
        const mongourl = "mongodb://localhost:27017/Sololibro";
        const client=await MongoClient.connect(mongourl);
        return client.db();
    }catch(error){
        console.error(error);
    }
}

module.exports = {getConnection};
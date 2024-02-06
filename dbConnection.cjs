const {MongoClient} = require('mongodb')
let dbConnection
function connectToDb(callback){
    MongoClient.connect("mongodb+srv://madhumita:mAdHu@atlascluster.apog2kn.mongodb.net/expenseData?retryWrites=true&w=majority")//give string from mongodb .. left la three dot and copy connection string
    .then(function(client){ // here promise to be resolved so then is written , by default client is there, connetivity is the client
    dbConnection = client.db()// to get data access
    callback()
    }).catch(function(error){
        callback(error)
    })
    // console.log(dbConnection)
}
function getDb(){
    return dbConnection // When we call this, it will return 
}
module.exports = {connectToDb,getDb} // export two funcs to server

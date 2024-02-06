const express = require('express')//1
const {connectToDb,getDb} = require('./dbConnection.cjs')//Importing required func from dbConnection.cjs
const app = express('path')//2
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const {ObjectId} =require('mongodb')

connectToDb(function(error){
    if(error){
        console.log("can't establish")
    }else{
        const port = process.env.PORT || 8000
        app.listen(8000)
        db = getDb() // Returning from getDb()
        console.log("listening")
    }
})
// app.listen(8000)
// app.get('/',function(request,response){//4
//     const data ={
//         'status' : 'welcome'
//     }
//     response.json(data) // 5 ,this is to check the localhost work or not 
// })
// app.listen(8000)//3



// expensTracker
app.post('/add-entry',function(request,response){ 
    db.collection('expenseData').insertOne(request.body).then(function(){// insert entry in body
        response.status(201).json({
            'status':'entry added'
        })
    }).catch(function(){
        response.status(500).json({
            'status':'entry is not added'
        })
    }) 
})
//to fetch
app.get('/get-entry',function(request,response) {
    const entries = [] //empty array
    db.collection('expenseData')
    .find() // frst data is pointer
    .forEach(entry => entries.push(entry)).then(function(){// iterate , and push frst entry into entries etc until all datas are pushed
        response.status(200).json(entries)
    }).catch(function(){ // if error , then it is in server(500), if(400) => client side
        response.status(500).json({
            "status" : "entry is not added"
        })
    })
 } )
 app.delete('/del-entry',function(request,response){
    if(ObjectId.isValid(request.query.id)){
        console.log(request.query) // to console the query from postman
        db.collection('expenseData').deleteOne({
            _id: new ObjectId(request.query.id)
        }).then(function(){
            response.status(200).json({
                "status" : "entry is deleted"
            })
        }).catch(function(){
            response.status(500).json({
                "status" : "entry is not deleted"
            })
        })
    }else{
        response.status(500).json({
            "status" : "entry is not valid"
        })
    }
   
 })
 app.patch('/update-entry/:id',function(request,response){
    if(ObjectId.isValid(request.params.id)){db.collection('expenseData').updateOne(
        { _id : new ObjectId(request.params.id)},//frst parametr => identifier:select which one is to update
        { $set : request.body} // the data to be ste or updated
    ).then(function(){
        response.status(200).json({
            "status" : "updated"
        })
    }).catch(function(){
        response.status(500).json({
            "status" : "sorry"
        })
    })
}else{
    response.status(500).json({
        "status" : "object is not valid"
    })
}
    
 })
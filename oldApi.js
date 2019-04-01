/**INI MERUPAKAN FILE API YANG AKAN CONNECT KE MONGODB 
 * API juga bisa disebut mini server karena API menerima request
 * dan memberikan respond atas request tersebut
*/

// for api
const express = require('express')
const app = express()
const port = 2020

// for mongodb
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

// for body
const bodyParser = require('body-parser')//agar kita bisa membaca object saat axios.post
app.use(bodyParser.json())

const URL = 'mongodb://127.0.0.1:27017'
const database = 'nyobaMongo'

MongoClient.connect(URL,{useNewUrlParser: true},(err, client)=>{
    if(err){
        return console.log('unable to connect to the database');
    }
    console.log('berhasil terkoneksi dengan MongoDB');
    const db = client.db(database)

    //Do something here!!
    app.get('/users',(req,res)=>{ //req: inputan dari user, res: cara kita merespon
        db.collection('users').find({}).toArray((err,users)=>{
            res.send(users)
        })
    })

    app.post('/register',(req,res)=>{
        const {nama,umur} = req.body 
        db.collection('users').insertOne({name:nama, age: umur}).then(()=>{
            res.send({
                message: 'Insert data success',
                dataYgMasuk:{
                    name: nama,
                    age: umur
                }
            })
        })
    })

})
    //CRUD Create Read Update Destroy
//     db.collection('users').insertMany([
//         {name:'alvin', age:22},
//         {name:'blvin', age:23},
//         {name:'clvin', age:24},
//         {name:'dlvin', age:25},
//         {name:'elvin', age:26},
//         {name:'flvin', age:27}
//     ])

//     db.collection('users').findOne({name:'Alvin'},(err, user)=>{
        
//         if(user===null){
//             console.log('Data tidak berhasil ditemukan');
            
//         }
//         console.log(err)
//     })

// })


// // create route
// app.get('/',(req,res)=>{
//     res.send('<h1>Selamat datang di custom api</h1>')
// })

// app.get('/users',(req,res)=>{
//     res.send([
//         {nama:'Alvin',age:27},
//         {nama:'Bolvin',age:28},
//         {nama:'Calvin',age:29},
//     ])
// })

/**INI MERUPAKAN FILE API YANG AKAN CONNECT KE MONGODB 
 * API juga bisa disebut mini server karena API menerima request
 * dan memberikan respond atas request tersebut
*/

// SETTING FOR API(Express)
const express = require('express') //return sebuah function
const app = express()
const port = 2019
app.use(express.json())

// SETTING FOR MONGODB
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const URL = 'mongodb://127.0.0.1:27017' // mongodb will running
const database = 'API-MongoDB' //database name 

// Connect to Database
MongoClient.connect(URL,{useNewUrlParser: true},(err, client)=>{
    if(err){
        return console.log('unable to connect to the database');
    }
    console.log('berhasil terkoneksi dengan MongoDB');
    const db = client.db(database)

    /* DO HANDLING REQUEST USING MONGODB IN HERE */

    app.get('/initdata', (req, res) => { // route
        db.collection('users').insertMany([ // insertMany([list of data])
            { name: 'Alfred', age: 18 },
            { name: 'Jhonny', age: 28 },
            { name: 'Deep', age: 38 },
            { name: 'Bean', age: 19 },
            { name: 'Dora', age: 22 },
            { name: 'Marvel', age: 32 },
            { name: 'Benjamin', age: 32 },
        ]).then(resp => {
            res.send({
                executedStatus: resp.result.ok,
                insertedCount: resp.insertedCount,
                insertedIds: resp.insertedIds,
                docs: resp.ops
            })
            
        }).catch(err => {
            res.send({
                err: "Unable to do operation: insertMany"
            })
        })

        db.collection('products').insertMany([
            {name:'T-Shirt O Neck', desc: "Best T-Shirt in Town", price: 12000},
            {name:'T-Shirt V Neck', desc: "Best T-Shirt in City", price: 12000},
            {name:'Tyloo Shoes', desc: "Best Shoes in Town", price: 12000},
            {name:'Tyloo Original Hoodie', desc: "Best Hoodie in Town", price: 12000},
            {name:'Terserra Pants', desc: "Best Pants in City", price: 12000},
            {name:'X22 Wireless Card', desc: "Best Card in Town", price: 12000},
            {name:'RC Car', desc: "Best Car in City", price: 12000},
        ])
    })

})

/*HANDLING REQUEST
GET,POST, DELETE, PUT BELUM PAKE MONGO */

// GET
app.get('/users', (req,res)=>{// end point
    // req : akan berisi parameter, data yang yang dikirim bersamaan proses request
    // res : object berisi method untuk memberikan respon ke client 
    res.send({
        message:'hello',
        number: 23
    })
})

app.get('/getusers',(req,res)=>{
    console.log(req.query);
    
})

app.get('/users/:age',(req,res)=>{
    console.log(`Umur yang masuk ${req.params.age}`);
})

// POST
app.post('/users',(req,res)=>{
    console.log(req.body);
})

//running API(Express)
app.listen(port,()=>{
    console.log(`API berhasil dijalankan dengan port ${port}`);
})
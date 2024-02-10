const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("task  server in raning ")
})
// 44nhE4ivRz6sY0bW
// user
    

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.PASSWORD}@atlascluster.pwovdtc.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {serverApi: {version: ServerApiVersion.v1,strict: true,deprecationErrors: true, }
});

async function run() {
    const userCollection = client.db('user').collection("taskUser")
  try {
    app.post('/user', async(req,res) => {
       const data = req.body
       const  result = await userCollection.insertOne(data) 
       res.send(result)
    })
    app.get('/users', async(req ,res) =>{
        const query = {}
        const data =  userCollection.find(query)
        const user = await data.toArray()
        res.send(user)
    })
    app.get('/user/:id',async (req, res) => {
        const requesID = req.params.id;
        const id = {_id: new ObjectId(requesID)};
        const data = await userCollection.findOne(id)
        res.send(data)
    })
  } finally {
 
  }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`user task server raning on port ${port}`)
})
//dependencies
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const { application } = require("express");
//initialize the express app
const app = express();
//configure app settings
require("dotenv").config();

const { PORT = 4000, MONGODB_URL } = process.env;

//connect to mongodb
mongoose.connect(MONGODB_URL);

//mongoose event listener
mongoose.connection
  .on("connected", () => console.log("Connected to Mongodb"))
  .on("error", (err) => console.log("Error with MongoDB:" + err.message));

//set up our model
const peopleSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    title: String,
  },
  { timestamps: true }
);

const People = mongoose.model("People", peopleSchema);
//mount middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
// creates req.body from incoming JSON request bodies
//also creats req.body only when express is serving HTML
//mount routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

//INDEX
app.get("/people", async(req, res)=>{
    try {
        res.json(await People.find({}));
    } catch (error){
        res.json({error: 'something went wrong - check console'})
    }
})
//CREATE
app.post('/people', async (req, res) => {
 try{ 
    res.json(await People.create(req.body));
 } catch (error) {
    console.log('error:' , error)
    res.json({error: 'something went wrong - check console'})
 }
})
//UPDATE
app.put('/people/:id', async (req, res) => {
    try{
        res.json(await People.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {new: true}
        ));
       
    } catch (error){
         console.log('error: ', error)
         res.json({error: 'something went wrong - check console'})
    }
})
//DELETE

app.delete('/people/:id', async (req, res) => {
    try{
        res.json(await People.findByIdAndDelete
            (req.params.id));
    } catch(error) {
        console.log('error: ', error)
        res.json({error: 'something went wrong - check console'})
    }
})
//tell express to listen
app.listen(PORT, () => {
  console.log(`Express is listening of port ${PORT}`);
});

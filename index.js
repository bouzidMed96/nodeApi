const express = require('express');
const routes = require('./routes/product.js');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());

//Middelware
app.use(routes);

//Connection to DataBase
const mongoURI = `mongodb://localhost:27017/products`;
mongoose
.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoReconnect:true
});
mongoose.connection
    .once("open", () => console.log("Connected"))
    .on("error", error => {
        console.log("erroe",error);
    });



app.get('/',(req,res) =>{
    res.send("welcome!");
});
//Server Listening on port 3000
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`im listening on port ${port}`);
});
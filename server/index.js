const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/post.model.js");
const postRoute = require("./routes/post.route.js");
const userRoute = require("./routes/users.route.js");
const authRoute = require("./routes/auth.route.js");
var cors = require('cors')
const app = express();

// middleware
app.use(cors({
    origin: 'http://localhost:3000',    // Allow only requests from this origin
    credentials: true                 // Allow cookies to be sent and received
  }));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);



mongoose.connect('mongodb+srv://milovanmarkovic4development:mongodb994@cluster0.svygeh4.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('Connected to database!');
    app.listen(3001, () => {
        console.log('Server run on port 3001!');
    });    
})
.catch(()=>{
    console.log('Connecteion faild!')
});


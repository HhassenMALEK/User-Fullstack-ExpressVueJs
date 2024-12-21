// npm init -y
// npm i express
// npm i -D nodemon

const express = require("express")
const userRouter = require("./app/router/userRouter")
const cors = require('cors');

const app = express()

app.use(express.json())

app.use(cors());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });

app.use(userRouter)



app.listen(3000, () => {
  console.log("App running on port 3000")
})




app.use((req, res) => {
  res.status(404).json({ message: "Page not found !" })
})

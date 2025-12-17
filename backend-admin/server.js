const express = require('express')

const adminRouter = require("./routes/admin") 

const app = express()

app.use(express.json())
app.use('/admin',adminRouter)

app.listen(4000,'localhost',()=>{
    console.log("server started at port 4000")
})
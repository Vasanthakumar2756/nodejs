import express from 'express'

import studentsroutes from './student.js'

const app = express();

app.use(express.json());
app.use("/api",studentsroutes);

app.listen(3000,()=>{
    console.log("server running on port 3000")
})
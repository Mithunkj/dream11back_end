const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const  connectDB  = require("./config/config")

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

connectDB()

app.use('/add-team', require("./routers/teamRoute"));
app.use('/process-result', require("./routers/processResultRoute"));
app.use('/team-result', require("./routers/teamResultRoute"));

app.listen(9000,() =>{ console.log("app listen port 9000")})

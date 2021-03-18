const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes')
const port = process.env.PORT || 3000
const http = require('http').Server(app);

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(router)

http.listen(port, () => {
  console.log('App listen in http://localhost:'+3000);
})
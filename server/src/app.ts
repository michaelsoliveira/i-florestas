import express from "express"
import cookieParser from 'cookie-parser'
import "./database"
import routes from "./routes"
import cors from 'cors'

import { server } from "./config"

const app = express()
import fetch from 'cross-fetch'

app.get('/ia', async function(req, res) {
  await fetch('http://127.0.0.1:5000/flask', {
    method: 'GET'
  })
  .then(res => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.text();
  })
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    console.error(err);
  });
})

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  }
app.use(cors(corsOptions));
// app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use(routes)

app.listen(3333, () => {
    console.log("Now running on Port 3333")
})


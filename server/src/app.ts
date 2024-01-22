import express from "express"
import cookieParser from 'cookie-parser'
import routes from "./routes"
import cors from 'cors'

const app = express()
import fetch from 'cross-fetch'
import { errorMiddleware } from "./middleware/error"

app.get('/ia', async function(req, res) {
  await fetch('http://127.0.0.1:5000/home', {
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
app.use(express.json({limit: '50mb'}))
// app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use(routes)
app.use(errorMiddleware)

app.listen(3333, () => {
    console.log("Now running on Port 3333")
})


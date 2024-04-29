require('dotenv').config({ path: `${__dirname}/../.env.io` })
import { Request, Response, NextFunction } from "express"
const express = require('express');
import routes from "./routes"
import * as Sentry from "@sentry/node";
import cors from 'cors'
import { Server } from 'socket.io'

const app = express()
const cookieParser = require('cookie-parser')

import { errorMiddleware } from "./middleware/error"
import { initializeSentry } from "./sentry";

const tracker = require('./track.ts')

console.log('Version: ' + process.env.IO_VERSION)
console.log('Stage: ' + process.env.IO_STAGE)

initializeSentry(app, Sentry, process.env.SENTRY_DSN || "")



// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(tracker({
  id: process.env.MATOMO_ID,
  base: process.env.BASE_URL,
  token: process.env.MATOMO_TOKEN,
  stage: process.env.STAGE,
  version: process.env.VERSION
}))

var whitelist = ["http://localhost:3000", "http://200.129.254.39:49157", "http://io.cnpgc.embrapa.br:49157", "https://bomanejo-app.a.cnpgc.embrapa.br", "https://bomanejo-ml.alpha.agro.rocks", "http://localhost:8501"]
var corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
}
app.use(cookieParser())
app.use(express.json({limit: '50mb'}))
// app.use(express.urlencoded({limit: '50mb'}));
app.use(cors(corsOptions))
app.use(routes)

app.get("/debug", function(request: Request, response: Response, Next: NextFunction){
  Sentry.captureMessage('Sending debug message to Sentry at ' + new Date())

    try {
      console.log("Sending debug message to Sentry");
    } catch(e) {
      Sentry.captureException(e)
    }

    return response.status(200).json({
      message: 'Debug and error messages sent to Sentry!'
    })
})

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.use(errorMiddleware)

const server = app.listen(3333, () => {
    console.log("Now running on Port 3333")
})

const io = new Server(server, {
  cors: {
    origin: ['https://bomanejo-app.a.cnpgc.embrapa.br', 'https://bomanejo-ml.alpha.agro.rocks', 'http://localhost:3000']
  }
})


io.on('connection', (socket: any) => {
  global.Socket = socket

  const createdMessage = (msg: any) => {
    io.emit('access_token', msg);
  };

  socket.on("send_access_token", createdMessage);

  socket.on("disconnect", async () => {
    socket.disconnect()
  })
})
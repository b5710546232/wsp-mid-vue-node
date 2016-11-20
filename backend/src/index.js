import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import config from './config'
import routes from './routes';

const app = express()
app.server = http.createServer(app)


// middleware

app.use(bodyParser.json({
  limit : config.bodyLimit
}))
app.use((req, res, next)=> {
  res.header('Access-Control-Allow-Origin', "*")
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})
// passport config

// api routes v1
app.use('/v1', routes)

app.server.listen(config.port)

console.log(`Started on port ${app.server.address().port}`)

export default app

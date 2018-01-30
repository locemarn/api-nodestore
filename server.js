const http    = require('http')
const debug   = require('debug')('nodestr:server')
const express = require('express')

const app = express()
const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

const server = http.createServer(app)
const router = express.Router()

const route = router.get('/', (req, res, next) => {
  res.status(200).send({
    title: "Node Store API",
    version: "0.0.1"
  })
})

app.use('/', route)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
console.log('Server ON: ' + port)

// Funçoes tiradas do proprio express
// normalizando a porta
function normalizePort(val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }

  if (port >= 0) {
    return port
  }

  return false
}

// Tratativa de erros
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ?
    'Pipe ' + port : 
    'Port ' + port
    
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in user')
      process.exit(1)
      break;
    default:
      throw error
  }
}

// pega as inf do servidr e starta o debug
function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' 
    ? 'pipe ' + addr 
    : 'port ' + addr.port

  debug('Listening on ' + bind)
}
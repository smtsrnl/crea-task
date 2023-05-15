// server.js
const jsonServer = require('json-server')
const cors = require('cors');

const server = jsonServer.create()
const router = jsonServer.router('db.json')

server.use(cors());
server.use(router)
server.listen(8000, () => {
    console.log('JSON Server is running')
})
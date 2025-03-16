import express from 'express'
import path from 'path'

const server = express()

server.set('view engine', 'ejs')

server.set('views', path.join('../climate.v2/views'))
server.use(express.static('public'))
server.get('/', (req, res) => {
    res.render('index', {title: 'Pagina Inicial', message: 'Seila'})
})

server.listen(3000, () => {
    console.log('🚀 Server is running in port 3000; http://localhost:3000')
})
//Handlebars import:
import handlebars from 'express-handlebars';

import express from 'express';

import { Server } from 'socket.io';

import {router as productsRouter} from './routes/products.router.js';

import {router as cartsRouter} from './routes/carts.router.js';

import {router as viewsRouter} from './routes/views.router.js'

import path from 'path';

import __dirname from './utils.js';

const PORT = 8080

const app=express()

//handlebars config
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

//json encode
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, '/public')))



app.use('/products', productsRouter)

app.use('/carts', cartsRouter)

app.use('/', viewsRouter)


const serverExpress = app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`)
})

const serverSocket=new Server(serverExpress)

serverSocket.on('connection', (socket)=>{
    console.log(`Client connected as ${socket.id}`);
    
})
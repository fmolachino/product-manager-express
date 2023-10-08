//Outies
import handlebars from 'express-handlebars';
import express from 'express';
import { Server } from 'socket.io';
import mongoose from 'mongoose'
import path from 'path';

//js imports
import {router as productsRouter} from './routes/products.router.js';
import {router as cartsRouter} from './routes/carts.router.js';
import {router as viewsRouter} from './routes/views.router.js'

//Customs
import __dirname from './utils.js';
import { ProductManager } from './productsHandler.js';


//--------------------------------
let productsPath = path.join(__dirname, 'files', 'products.json');
const productManager = new ProductManager(productsPath)
const products = productManager.getProducts();
//--------------------------------

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


//root paths:
app.use('/products', productsRouter)

app.use('/carts', cartsRouter)

app.use('/', viewsRouter)



const serverExpress = app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`)
})

const serverSocket=new Server(serverExpress)

serverSocket.on('connection', (socket)=>{
    //console.log(`Client connected as ${socket.id}`);

    // socket.emit('welcome', {message: "Message from server socket's welcome"})

    // socket.on('identificacion', name=>{
    //     console.log(`${name}, has been connected.`);
    //     socket.emit('idCorrecto', {message:`Hello ${name}, welcome..!!!`})
        
    // })

    
    
})

setInterval(() => {
    serverSocket.emit('updatedProducts', products, new Date().toUTCString())
    
}, 3000)


//Mongodb configs

try {
    await mongoose.connect('mongodb+srv://fmolachino:coderhousetpfinal@mongodbcluster00.qk1igyb.mongodb.net/?retryWrites=true&w=majority&dbName=ecommerce')
    console.log('Connected to MongoDB - fershop db')
} catch (error) {
    console.log(error.message)    
}

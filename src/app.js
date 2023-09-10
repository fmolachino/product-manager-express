//Handlebars import:
import handlebars from 'express-handlebars';

import express from 'express';

import {router as productsRouter} from './routes/products.router.js';

import {router as cartsRouter} from './routes/carts.router.js';

import {router as viewsRouter} from './routes/views.router.js'

import __dirname from './utils.js';

const PORT = 8080

const app=express()

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')


app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use('/products', productsRouter)

app.use('/carts', cartsRouter)

app.use('/', viewsRouter)





app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`)
})
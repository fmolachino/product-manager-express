import express from 'express';

import {router as productsRouter} from './routes/products.router.js';

import {router as cartsRouter} from './routes/carts.router.js';

const PORT = 8080

const app=express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/products', productsRouter)

app.use('/carts', cartsRouter)




app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`)
})
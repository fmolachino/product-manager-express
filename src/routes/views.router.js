import { Router } from "express";
export const router=Router()

import path from 'path'

//import { products } from '../productsHandler.js';
import __dirname from '../utils.js'
import { ProductManager } from '../productsHandler.js';

let productsPath = path.join(__dirname, 'files', 'products.json');

const productManager = new ProductManager(productsPath)
const products = productManager.getProducts();

//-------------------Handlebars try--------------




//calling example for handlebars:
router.get('/',(req,res)=>{
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).render('home', {
        products,
        title:'Home Page - All Products'
    });
})

router.get('/realtimeproducts', (req, res) => {
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).render('realTimeProducts', {
        //...
        //...
    });
})
//-------------------Handlebars try--------------
import { Router } from "express";
export const router=Router()

import path from 'path'

//import { products } from '../productsHandler.js';
import __dirname from '../utils.js'
import { ProductManager } from '../dao/dbHandlers/productsHandler.js';

//let productsPath = path.join(__dirname, 'files', 'products.json');

const productManager = new ProductManager()
//const products = productManager.getProducts();

//-------------------Handlebars try--------------




//calling example for handlebars:
router.get('/', async (req,res)=>{

    //limiting the amount of items retrieved. If no limit, 20 is the default (in this case)
    let {limit}=req.query
    if(!limit) {limit=10;}

    let page=req.query.page;
    if(!page) {page=1;}

    let {sort}=req.query
    
    let products = await productManager.getPaginatedProducts(limit, true, page, sort);

    let { totalPages,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        } = products
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).render('home', {
        products: products.docs,
        totalPages,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page,
        limit,
        title:'Home Page - All Products'
    });
})

router.get('/realtimeproducts',async (req, res) => {

    let products = await productManager.getProducts();
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).render('realTimeProducts', {
        //...
        //...
    });
})
//-------------------Handlebars try--------------
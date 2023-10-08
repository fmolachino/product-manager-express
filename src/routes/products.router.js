import {Router} from 'express';
import path from 'path'
import { testModel } from "../dao/models/test.model.js";
import mongoose from "mongoose";

export const router = Router();

//import { products } from '../productsHandler.js';
import __dirname from '../utils.js'
import { ProductManager } from '../dao/dbHandlers/productsHandler.js';
//import { Product } from '../dao/dbHandlers/productsHandler.js';

let productsPath = path.join(__dirname, 'files', 'products.json');

const productManager = new ProductManager()
//const products = productManager.getProducts();



router.get('/', (req,res)=>{

    let {limit}=req.query

    if (limit) {
        let limitOfProducts = parseInt(limit)

        //console.log(limit, typeof limitOfProducts)

        if (limitOfProducts<=products.length) {
            const slicedProducts =products.slice(0, limitOfProducts)         
            res.json({status:'ok', data:slicedProducts})
            
        } else if (limitOfProducts===0){
            res.json({status:'ok', data:products})
        }else {
            res.json({status: 'error', message: 'Limit value must be a numerical value, please try again.'})
            return
        }
    }
    else {
        res.json({status:'ok', data:products})
    }
    

})

router.get('/:id', (req,res)=>{

    let id = parseInt(req.params.id)

    if (isNaN(id)) {
        res.json({status: 'error', message: 'Id must be a numerical value, please try again.'})
        return
    }

    let productById=products.filter(product=>product.id===id)

    if(productById.length>0){
        res.json({status:'ok', data:productById})
    } else {
        res.json({status: 'error', message: `Product with id: ${id} doesn't exists.`})
        
    }
    

})

//Adding a product
router.post('/', (req,res)=>{

    let {title, description, code, price, stock, category, thumbnail} = req.body;

    if(!title || !description || !code || !price || !stock || !category || !thumbnail)
        return res.status(400).json({error:'An information field is missing'})

    productManager.addProduct(title, description, price, thumbnail, code, stock, category)

    res.status(200).json({message:`The new product: ${title}, has been added succesfully.`})

})


//Updating an existing product
router.put('/:id', (req,res)=>{

    let id = parseInt(req.params.id)

    if (isNaN(id)) {
        res.json({status: 'error', message: 'Id must be a numerical value, please try again.'})
        return
    }

    let {title, description, code, price, stock, category, thumbnail} = req.body;

    if(!title || !description || !code || !price || !stock || !category || !thumbnail)
        return res.status(400).json({error:'An information field is missing'})

    let newProduct = new Product(title, description, price, thumbnail, code, stock, id, category)
    
    productManager.updateProductFromPage(id, newProduct)

    res.status(200).json({message:`The Product: ${title}, has been updated succesfully.`})

})


//Deleting an existing product
router.delete('/:id', (req,res)=>{

    let id = parseInt(req.params.id)

    if (isNaN(id)) {
        res.json({status: 'error', message: 'Id must be a numerical value, please try again.'})
        return
    }

    let productToDeleteTitle = productManager.getProductById(id).title;

    productManager.deleteProduct(id);

    res.status(200).json({message:`The Product: ${productToDeleteTitle}, with id: ${id}, has been Deleted succesfully.`})

})




router.post('/test', async(req,res)=>{

    let item = req.body;

    if(!item)
        return res.status(400).json({error:'Falta ingresar algun campo del producto'})

    try {
        let newItem=await testModel.create(item)
    
        res.status(201).json({newItem})
        
    } catch (error) {
        res.status(500).json({error:'Error inesperado', detalle:error.message})
        
    }

})






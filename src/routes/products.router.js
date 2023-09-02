import {Router} from 'express';
import path from 'path'

export const router = Router();

//import { products } from '../productsHandler.js';
import __dirname from '../utils.js'
import { ProductManager } from '../productsHandler.js';
import { Product } from '../productsHandler.js';

let productsPath = path.join(__dirname, 'files', 'products.json');

const productManager = new ProductManager(productsPath)
const products = productManager.getProducts();



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
        return res.status(400).json({error:'Falta ingresar algun campo del producto'})

    productManager.addProduct(title, description, price, thumbnail, code, stock, category)

    return res.status(200).json({message:`The new product: ${title}, has been added succesfully.`})

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
        return res.status(400).json({error:'Falta ingresar algun campo del producto'})

    let newProduct = new Product(title, description, price, thumbnail, code, stock, id, category)

    let oldProdIndex = productManager.getProducts().findIndex(product => product.id === id)    
    
    productManager.updateProductFromPage(oldProdIndex, newProduct)

    return res.status(200).json({message:`The Product: ${title}, has been updated succesfully.`})

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

    return res.status(200).json({message:`The Product: ${productToDeleteTitle}, with id: ${id}, has been Deleted succesfully.`})


    //return res.status(400).json({error:'Falta ingresar algun campo del producto'})
})


// "title": "producto 1",
// 		"description": "description",
// 		"price": 99,
// 		"thumbnail": "sin-imagen",
// 		"code": "a",
// 		"stock": 10,
// 		"id": 0





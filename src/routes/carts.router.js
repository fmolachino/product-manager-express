import {Router} from 'express';
import path from 'path'

export const router = Router();

import __dirname from '../utils.js'
import { CartManager } from '../cartHandler.js';
import { ProductManager } from '../productsHandler.js';


//Cart manager 
let cartsPath = path.join(__dirname, 'files', 'carts.json');

const cartManager = new CartManager(cartsPath)
const carts = CartManager.getCarts;


//Product manager, to get product info via its id
let productsPath = path.join(__dirname, 'files', 'products.json');
const productManager = new ProductManager(productsPath)
const products = productManager.getProducts()

//Adding a cart
router.post('/', (req,res)=>{

    let {products} = req.body
  
    if(!products || products.length<1)
        return res.status(400).json({error:'No se han agregado productos al carrito'})

    cartManager.addCart(products);

    res.status(200).json({message:`The new cart has been added succesfully.`})

})

router.get('/:cid', (req,res)=>{

    let cid = parseInt(req.params.cid)
    

    if (isNaN(cid)) {
        res.json({status: 'error', message: 'Cart id must be a numerical value, please try again.'})
        return
    }

    let cart = cartManager.getCartById(cid)
    
    res.status(200).json(cart.products)
    
})
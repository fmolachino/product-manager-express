import {Router} from 'express';
import path from 'path'

export const router = Router();

//import { products } from '../productsHandler.js';
import __dirname from '../utils.js'
import { CartManager } from '../cartHandler.js';


let cartsPath = path.join(__dirname, 'files', 'carts.json');

const cartManager = new CartManager(cartsPath)
//const carts = CartManager.getCarts;

//Adding a cart
router.post('/', (req,res)=>{

    let {products} = req.body;
    //console.log(products);
    

    if(!products || products.length<1)
        return res.status(400).json({error:'No se han agregado productos al carrito'})

    cartManager.addCart(products)

    return res.status(200).json({message:`The new cart has been added succesfully.`})

})
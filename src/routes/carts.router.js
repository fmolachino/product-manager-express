import {Router} from 'express';
import path from 'path'

export const router = Router();

import __dirname from '../utils.js'
import { CartManager } from '../dao/dbHandlers/cartHandler.js';
import { ProductManager } from '../productsHandler.js';


//Cart manager 
//let cartsPath = path.join(__dirname, 'files', 'carts.json');

const cartManager = new CartManager()
//const carts = CartManager.getCarts();


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

    //Post but adding product as its id and quantity only: --Its the same virtually... it only changes how it looks like the array products, yes
    // let {products} = req.body

    // if(!products || products.length<1)
    //     return res.status(400).json({error:'No se han agregado productos al carrito'})

    //products = [{prodId:4, quantity:6}, {prodId:6, quantity:5}]
})

//Get cart by cid
router.get('/:cid', async (req, res) => {
    let cid = parseInt(req.params.cid);

    if (isNaN(cid)) {
        return res.status(400).json({ error: 'Cart id must be a numerical value, please try again.' });
    }

    try {
        let cart = await cartManager.getCartById(cid);
        console.log(`cart from router: ${JSON.stringify(cart)}`);
        console.log(typeof cart.products);
        res.status(200).json({ cart: cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//Post add product by its id, to a desired cid
router.post('/:cid/product/:pid', (req,res)=>{
    //Parsing id's and controlling them
    let cid = parseInt(req.params.cid)
    let pid = parseInt(req.params.pid)

    if (isNaN(cid)||isNaN(pid)) {
        return res.status(400).json({error:'Cart id and Product id must be a numerical value, please try again.'})
    }

    if(!cartManager.getCartById(cid)){
        return res.status(400).json({error: `Cart with id: ${cid}, doesn't exists. Please enter a valid cart id`})
    }

    if(!productManager.getProductById(pid)){
        return res.status(400).json({error: `Product with id: ${pid}, doesn't exists. Please enter a valid product id`})
    }

    cartManager.addProductViaCid(cid, pid)
    res.status(200).json({message: `The product with id: ${pid}, has been successfully added t cart id: ${cid}`})

})

//TODO '/:cid/product/:pid'
//TODO 


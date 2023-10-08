//TODO Finish controlers for put and post methods.

import { cartsModel } from '../models/carts.model.js';
import __dirname from '../../utils.js'

export class CartManager{

    #cartList = cartsModel.find();

    cartIdProvider = this.getMaxIdFromDb();

    

    constructor() {
         // When instanciated, it loads the file, so whenever i create a CartManager...
    }

    async getMaxIdFromDb(){
        try {
            const result = await cartsModel.find()
                .sort({ id: -1 })
                .limit(1)
                .exec();

            if (result.length > 0) {
                return result[0].id;
            } else {
                return 0;
            }
        } catch (err) {
            console.error(err);
            return 0;
        }
    }
    
    
    async addCart(products) {        
        try {
            let id = await this.getIdAndIncrease();
            //console.log(`ID from addCart is: >>> : ${id}`);
            
            await cartsModel.create({ products, id }); // Provide an object here
            console.log("Cart added successfully.");
        } catch (err) {
            console.error(err);
        }
    }

    getProducts(){
        
    }


    //change this with addProductViaCid
    async getCartById(id){
        const cart = await cartsModel.find({id:id});
        console.log(`csl from gerCartById: ${cart}`);
        

        if (cart) {
            return cart;
        } else {
            throw new Error("Cart with id: " + id + " doesn't exist.");
        }
    }

    updateProduct(id, toUpdateProduct){
        
    }

    addProductViaCid(cid, pid){
        let cart = this.getCartById(cid)
        
        const productAlreadyInCart = cart.products.some(product => product.pid === pid)
        
        if(productAlreadyInCart){
            let product = cart.products.find(product => product.pid === pid);
            product.quantity+=1;
        } else{
            let productToAdd = {pid, quantity:1}            
            cart.products.push(productToAdd)
            cartsModel.findOneAndUpdate(
                {id:cid}, {products:cart.products}, {new:true},
                (err, updatedCart)=>{
                    if(err){
                        console.log(err);
                        return                        
                    }
                    if (updatedCart) {
                        console.log("Updated cart:", updatedCart);
                    } else {
                        console.log("Cart not found.");
                    }
                })
        }
    }

    //deleting a prod by id
    deleteProduct(id){
        if(cartsModel.findOne({id:id})){
            cartsModel.findByIdAndDelete({id:id})
            console.log(`Cart with id: ${id} removed succesfully`);
        } else{
            console.log(`Cart with id: ${id} not found`);
        }
    }

    async getIdAndIncrease() {
        try {
            const maxId = await this.getMaxIdFromDb();
            const id = parseInt(maxId) + 1;
            return id;
        } catch (err) {
            console.error(err);
            return 0; // Return a default value or handle the error accordingly
        }
    }
    

    getId(){
        let id = new CartManager().getMaxIdFromDb();
        console.log(`ID FROM GETID: ${id}`);
        return id;
    }

    getThisCarts(){
        return cartsModel.find()
    }

    
}

export class Cart{

    constructor(id, products){

        this.products=products
        this.id=id
        
    }

}


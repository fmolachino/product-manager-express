//TODO Finish controlers for put and post methods.

import fs from 'fs';

import path from 'path'
import __dirname from './utils.js'

export class CartManager{

    #cartList = [];

    static #cartIdProvider = 0;

    

    constructor(path) {
        this.#cartList = [];
        this.path = path;
        
        this.loadFromFile(); // When instanciated, it loads the file, so whenever i create a CartManager...
    }

    addCart(products){
       let id = this.getIdAndIncrease()
       let cart = new Cart (id, products)
       this.#cartList.push(cart)
       this.saveToFile();    
    }

    getProducts(){
        
    }

    getCartById(id){
        const cart = this.#cartList.find(cart => cart.id === id);

        if (cart) {
            return cart;
        } else {
            throw new Error("Cart with id: " + id + " doesn't exist.");
        }
    }

    updateProduct(id, toUpdateProduct){
        
    }

    updateProductFromPage(oldProductIndex, newProduct){


    }

    //TODO control for non existent id
    deleteProduct(id){

       
    }

    isCodeAvailable(code){
       
    }

    getIndexFromId(id){
        
    }

    getIdAndIncrease(){
        let id = CartManager.getId()
        CartManager.increaseId();
        return id;
    }

    static getId(){
        return CartManager.#cartIdProvider;
    }

    static setId(newId){
        CartManager.#cartIdProvider = newId;
    }

    static increaseId(){
        CartManager.#cartIdProvider +=1;
    }

    saveToFile() {
        try {
            if (!this.#cartList) {
                console.log(typeof this.#cartList);
                
                console.error('this.productsList is undefined.');
                return;
            }

            if (!fs.existsSync(this.path)) {
                fs.writeFileSync(this.path, JSON.stringify(this.#cartList));
            } else {
                fs.writeFileSync(this.path, JSON.stringify(this.#cartList, null, 2));
            }
            console.log('Cart file saved successfully.');
        } catch (error) {
            console.error('Error saving file:', error.message);
        }
    }

    //TODO finish loadFromFile for cart!
    loadFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            const products = JSON.parse(data);
            this.#cartList = products.map(
                p =>
                    new Cart(
                        p.id,
                        p.products
                    )
            );
            CartManager.#cartIdProvider = this.#cartList.reduce(
                (maxId, product) => Math.max(maxId, product.id),
                CartManager.#cartIdProvider,
            );
            CartManager.#cartIdProvider =  CartManager.#cartIdProvider +1
        } catch (error) {
            // TODO, maybe initialice an empty file?
        }
    }

    getThisCarts(){
        return this.#cartList
    }

    
}

export class Cart{

    constructor(id, products){

        this.products=products
        this.id=id
        
    }

}








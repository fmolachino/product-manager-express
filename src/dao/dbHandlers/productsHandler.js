//TODO Finish controlers for put and post methods.

import fs from 'fs';

import { productsModel } from '../models/products.model.js';

import path from 'path'
//import __dirname from './utils.js'

export class ProductManager{

    #productList = []

    constructor() {
        // this.#productList = []
        // this.idProvider = 0
        // this.getMaxIdFromDb().then((maxId) => {
        //     this.idProvider = maxId;
        //   });
    }

    async getMaxIdFromDb() {
        try {
          const result = await productsModel
            .find()
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

    async addProduct(title, description, price, thumbnail, code, stock, category){
        if(!this.isCodeAvailable(code)){
            throw new Error("The provided code: " +code+ " is already in use.");
        } 
        try {
                let id = await this.getIdAndIncrease();
                let product = await productsModel.create({
                                                    id: id,
                                                    title: title,
                                                    description: description,
                                                    price: price,
                                                    thumbnail: thumbnail,
                                                    code: code,
                                                    stock: stock,
                                                    category: category})
                
                console.log('Added product succesfully');
                //checker TO delete
                console.log("Added product: " + product.title);
        } catch (err){
            console.error(err);
            //TODO
        }
    }

    getProducts(){
        return this.#productList
    }

    getProductById(id){
        
        const product = this.#productList.find(product => product.id === id);

        if (product) {
            return product;
        } else {
            throw new Error("Product with id: " + id + " doesn't exist.");
        }
    }

    updateProduct(id, toUpdateProduct){
        const tempProd = this.getProductById(id)
        const index = this.#productList.findIndex(product => product.id === id)

        if(index !== -1) {
            this.#productList[index] = toUpdateProduct;
            this.saveToFile();
        }
        if(!this.isCodeAvailable(toUpdateProduct.code)){
            throw new Error("The code: " + toUpdateProduct.code + " is already taken.")
        } else {
            throw new Error("Product with id: " + id + " doesn't exist.")
        }
    }

    async updateProductFromPage(id, newProduct){

        try {
            let oldProduct = await this.findOne({id: id})
        } catch (err) {
            console.error(err);
        }

    }

    //TODO control for non existent id
    deleteProduct(id){

        let prodIndex = this.getIndexFromId(id);

        this.#productList.splice(prodIndex, 1);

        //Rename id so if the last element is remove it can be used again
        if((ProductManager.idProvider-1)===id){
            ProductManager.setId(id);
        }

        this.saveToFile();

    }

    async isCodeAvailable(code) {
        try {
            // check if a product with the given code exists
            const product = await productsModel.findOne({ code: code });

            // if product is null, no product with the given code was found
            return !product;

        } catch (error) {
            console.error('Error checking product availability:', error);
            return false; 
        }
    }

    getIndexFromId(id){
        const index = this.#productList.findIndex(product => product.id === id)
        return index
    }

    async getIdAndIncrease(){
        try {
            const maxId = await this.getMaxIdFromDb();
            
            const id = parseInt(maxId) + 1;
            return id;
            }
            
        catch (err) {
            console.error(err);
            return 0; // Return a default value or handle the error accordingly
        }
    }

    
    getThisProducts(){
        return this.#productList
    }

}




export class Product{

    constructor(title, description, price, thumbnail, code, stock, id, category){

        this.title=title
        this.description=description
        this.price=price
        this.thumbnail=thumbnail
        this.code=code
        this.stock=stock
        this.category=category
        this.id=id
        this.status=true
    }


}

//TODO getProducts method
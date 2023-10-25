//TODO Finish controlers for put and post methods.

import fs from 'fs';

import { productsModel } from '../models/products.model.js';

import path from 'path'
import { model } from 'mongoose';
import mongoose from 'mongoose';
//import __dirname from './utils.js'

export class ProductManager {

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

    async addProduct(title, description, price, thumbnail, code, stock, category) {
        if (!this.isCodeAvailable(code)) {
            throw new Error("The provided code: " + code + " is already in use.");
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
                category: category
            })

            console.log('Added product succesfully');
            //checker TO delete
            console.log("Added product: " + product.title);
        } catch (err) {
            console.error(err);
            //TODO
        }
    }

    async getProducts() {
        try{
            let products = await productsModel.find();
            return productsModel;
        } catch(err){
            console.error(err)
        }
    }

    async getProductById(id) {

        try {
            let product = await productsModel.findOne({ id: id })
            if (product) {
                return product
            }
        }
        catch (err) {
            console.error(err)
        }

    }

    async updateProductFromPage(id, newProduct) {

        try {
            let oldProduct = await productsModel.findOne({ id: id })
            if (!oldProduct) {
                console.log("The product with inputed id: " + id + " doesnt exists.");
                return
            }
            let updatedProduct =
                await productsModel.updateOne({
                    title: newProduct.title,
                    description: newProduct.description,
                    price: newProduct.price,
                    thumbnail: newProduct.thumbnail,
                    code: newProduct.code,
                    stock: newProduct.stock,
                    category: newProduct.category,
                    status: newProduct.status
                })

        } catch (err) {
            console.error(err);
        }
    }

    //TODO control for non existent id
    async deleteProduct(id) {

        try{
            let productToDelete = await productsModel.findOne({id: id})
            if(productToDelete){
                let prodTitle = productToDelete.title;
                await productsModel.deleteOne({id: id})
                return prodTitle
            }
            else {
                console.log(`The product with id: ${id}, doesnt exists.`);
            }
        }
        catch (err) {
            console.error(err);
        }

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

    getIndexFromId(id) {
        const index = this.#productList.findIndex(product => product.id === id)
        return index
    }

    async getIdAndIncrease() {
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


    getThisProducts() {
        return this.#productList
    }

    async getPaginatedProducts(limit, lean, page, sort){

        let products = {};

        if(sort==="asc"){
            products = await productsModel.paginate({}, {limit: limit, lean: lean, page: page, sort: {price: 1}})
        } else if (sort==="desc"){
            products = await productsModel.paginate({}, {limit: limit, lean: lean, page: page, sort: {price: -1}})
        } 
        else products = await productsModel.paginate({}, {limit: limit, lean: lean, page: page})
        
        return products
    }

}






export class Product {

    constructor(title, description, price, thumbnail, code, stock, id, category) {

        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.category = category
        this.id = id
        this.status = true
    }


}

//TODO getProducts method
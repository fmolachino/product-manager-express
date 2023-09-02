//const fs = require('fs');

import fs from 'fs';

//const path = require('path');

import path from 'path'
import __dirname from './utils.js'

export class ProductManager{

    #productList = [];

    static #idProvider = 0;

    

    constructor(path) {
        this.#productList = [];
        this.path = path;
        
        this.loadFromFile(); // When instanciated, it loads the file, so whenever i create a ProductManager...
    }

    addProduct(title, description, price, thumbnail, code, stock, category){
        if(!this.isCodeAvailable(code)){
            throw new Error("The provided code: " +code+ " is already in use.");
        }
        let id = this.getIdAndIncrease()
        let product = new Product(title, description, price, thumbnail, code, stock, id, category)
        this.#productList.push(product)
        console.log('Added product succesfully');
        console.log(product);
        this.saveToFile();        

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

    updateProductFromPage(oldProductIndex, newProduct){

        let oldProduct = this.#productList[oldProductIndex];
        

        for (const key in newProduct) {
            if (oldProduct.hasOwnProperty(key)) {
                oldProduct[key] = newProduct[key];
                console.log(newProduct[key]);
            }
        }

        this.saveToFile();

    }

    //TODO control for non existent id
    deleteProduct(id){

        let prodIndex = this.getIndexFromId(id);

        this.#productList.splice(prodIndex, 1);

        //Rename id so if the last element is remove it can be used again
        if((ProductManager.#idProvider-1)===id){
            ProductManager.setId(id);
        }

        this.saveToFile();

    }

    isCodeAvailable(code){
        return !this.#productList.some(product => product.code === code)
    }

    getIndexFromId(id){
        const index = this.#productList.findIndex(product => product.id === id)
        return index
    }

    getIdAndIncrease(){
        let id = ProductManager.getId()
        ProductManager.increaseId();
        return id;
    }

    static getId(){
        return ProductManager.#idProvider;
    }

    static setId(newId){
        ProductManager.#idProvider = newId;
    }

    static increaseId(){
        ProductManager.#idProvider +=1;
    }

    saveToFile() {
        try {
            if (!this.#productList) {
                console.log(typeof this.#productList);
                
                console.error('this.productsList is undefined.');
                return;
            }

            if (!fs.existsSync(this.path)) {
                fs.writeFileSync(this.path, JSON.stringify(this.#productList));
            } else {
                fs.writeFileSync(this.path, JSON.stringify(this.#productList, null, 2));
            }
            console.log('Products file saved successfully.');
        } catch (error) {
            console.error('Error saving file:', error.message);
        }
    }

    loadFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            const products = JSON.parse(data);
            this.#productList = products.map(
                p =>
                    new Product(
                        p.title,
                        p.description,
                        p.price,
                        p.thumbnail,
                        p.code,
                        p.stock,
                        p.id,
                        p.status,
                        p.category
                    )
            );
            ProductManager.#idProvider = this.#productList.reduce(
                (maxId, product) => Math.max(maxId, product.id),
                ProductManager.#idProvider,
            );
            ProductManager.#idProvider =  ProductManager.#idProvider +1
        } catch (error) {
            // TODO, maybe initialice an empty file?
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

//Testing it out:

// const url = path.join(__dirname, 'files', 'products.json');

// let productManager = new ProductManager(url);


// //Adding a few products
// //productManager.addProduct("producto 1", "description", 99, "sin-imagen", "a", 10, "category")
// // productManager.addProduct("producto 2", "description", 90, "sin-imagen", "b", 10, "category")
// // productManager.addProduct("producto 3", "description", 88, "sin-imagen", "c", 10, "category")
// // productManager.addProduct("producto 4", "description", 80, "sin-imagen", "d", 10, "category")
// // productManager.addProduct("producto 5", "description", 80, "sin-imagen", "e", 10, "category")
// // productManager.addProduct("producto 6", "description", 80, "sin-imagen", "f", 10, "category")
// // productManager.addProduct("producto 7", "description", 80, "sin-imagen", "g", 10, "category")
// // productManager.addProduct("producto 8", "description", 80, "sin-imagen", "h", 10, "category")
// // productManager.addProduct("producto 9", "description", 80, "sin-imagen", "i", 10, "category")
// // productManager.addProduct("producto 10", "description", 80, "sin-imagen", "j", 10, "category")


// const products = productManager.getProducts()

// // Save data to file when the process exits
// process.on('exit', () => {
//     productManager.saveToFile(); 
// });



// //module.exports={products}

// export{products}







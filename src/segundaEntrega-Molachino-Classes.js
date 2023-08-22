const fs = require('fs');

class ProductManager{

    #productList = [];

    static #idProvider = 0;

    constructor(path) {
        this.#productList = [];
        this.path = path;
        this.loadFromFile(); // When instanciated, it loads the file, so whenever i create a ProductManager...
    }

    addProduct(title, description, price, thumbnail, code, stock){
        if(!this.isCodeAvailable(code)){
            throw new Error("The provided code: " +code+ " is already in use.");
        }
        let id = this.getIdAndIncrease()
        let product = new Product(title, description, price, thumbnail, code, stock, id)
        this.#productList.push(product)

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
        } else {
            throw new Error("Product with id: " + id + " doesn't exist.")
        }

    }

    isCodeAvailable(code){
        return !this.#productList.some(product => product.code === code)
    }

    getIdAndIncrease(){
        let id = ProductManager.getId()
        ProductManager.increaseId();
        return id;
    }

    static getId(){
        return ProductManager.#idProvider;
    }

    static increaseId(){
        ProductManager.#idProvider +=1;
    }

    saveToFile() {
        const data = JSON.stringify(this.#productList, null, '\t');
        fs.writeFileSync(this.path, data, 'utf-8');
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
                        p.id
                    )
            );
            ProductManager.#idProvider = this.#productList.reduce(
                (maxId, product) => Math.max(maxId, product.id),
                ProductManager.#idProvider
            );
        } catch (error) {
            // A terminar, quizas puedo arrancar una file vacia...
        }
    }


}




class Product{

    constructor(title, description, price, thumbnail, code, stock, id){

        this.title=title
        this.description=description
        this.price=price
        this.thumbnail=thumbnail
        this.code=code
        this.stock=stock
        this.id=id
    }


}

//Testing it out:

const path = 'products.json'; 
let productManager = new ProductManager(path);


//Agrego un par de productos, solo sirve para probar estas 3 lineas
productManager.addProduct("producto 1", "description", 99, "sin-imagen", "a", 10)
productManager.addProduct("producto 2", "description", 90, "sin-imagen", "b", 10)
productManager.addProduct("producto 3", "description", 88, "sin-imagen", "c", 10)
productManager.addProduct("producto 4", "description", 80, "sin-imagen", "d", 10)
productManager.addProduct("producto 5", "description", 80, "sin-imagen", "e", 10)
productManager.addProduct("producto 6", "description", 80, "sin-imagen", "f", 10)
productManager.addProduct("producto 7", "description", 80, "sin-imagen", "g", 10)
productManager.addProduct("producto 8", "description", 80, "sin-imagen", "h", 10)
productManager.addProduct("producto 9", "description", 80, "sin-imagen", "i", 10)
productManager.addProduct("producto 10", "description", 80, "sin-imagen", "j", 10)







// Save data to file when the process exits
process.on('exit', () => {
    productManager.saveToFile(); 
});





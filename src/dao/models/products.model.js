import mongoose from "mongoose";

const productsCollection='products'
const productsSchema=new mongoose.Schema({
    title: {
        type: String, required:true
    },
    description: {
        type: String, required:true
    },
    price: {
        type: Number, required:true
    },
    thumbnail: {
        type: String, required:true
    },
    code: {
        type: String, required:true, unique:true
    },
    stock: {
        type: Number, required:true
    },
    category: {
        type: String, required:true
    },
    id: {
        type: Number, required:true, unique:true
    },
    status: {
        type: Boolean, default: false
    },
})

export const productsModel=mongoose.model(productsCollection, productsSchema)


/*
    "title": "producto 1",
    "description": "description",
    "price": 99,
    "thumbnail": [
      "sin-imagen"
    ],
    "code": "a",
    "stock": 10,
    "category": true,
    "id": 0,
    "status": true
*/
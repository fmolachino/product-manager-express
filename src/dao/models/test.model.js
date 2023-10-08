import mongoose from "mongoose";

const testCollection='test'
const testSchema=new mongoose.Schema({
    item: {
        type: String, required:true
    },
    
    id: {
        type: Number, required:true, unique:true
    },
})

export const testModel=mongoose.model(testCollection, testSchema)


const express=require('express')

//importing variable from a difrent .js file
const products = require('./segundaEntrega-Molachino-Classes').products

const PORT = 8080

const app=express()


app.get('/products', (req,res)=>{

    let {limit}=req.query

    if (limit) {
        let limitOfProducts = parseInt(limit)

        //console.log(limit, typeof limitOfProducts)

        if (limitOfProducts<=products.length) {
            const slicedProducts = products.slice(0, limitOfProducts)
            res.json({status:'ok', data:slicedProducts})
        } else if (limitOfProducts===0){
            res.json({status:'ok', data:products})
        }else {
            res.json({status: 'error', message: 'Limit value must be a numerical value, please try again.'})
            return
        }
    }
    else {
        res.json({status:'ok', data:products})
    }
    

})




app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`)
})
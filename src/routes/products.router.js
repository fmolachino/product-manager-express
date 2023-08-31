import {Router} from 'express';

export const router = Router();

import { products } from '../productsHandler.js';


router.get('/', (req,res)=>{

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

router.get('/:id', (req,res)=>{

    let id = parseInt(req.params.id)

    if (isNaN(id)) {
        res.json({status: 'error', message: 'Id must be a numerical value, please try again.'})
        return
    }

    let productById=products.filter(product=>product.id===id)

    if(productById.length>0){
        res.json({status:'ok', data:productById})
    } else {
        res.json({status: 'error', message: `Product with id: ${id} doesn't exists.`})
        
    }
    

})





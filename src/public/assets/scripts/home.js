const socket=io()

socket.on('updatedProducts', (products, timeStamp)=>{
    let productsContainer = document.getElementById('products-ul')
    let ul=''
    products.forEach(product=>{
        ul+=`<li>${product.title}</li>`
    })
    productsContainer.innerHTML=ul
})

socket.on('newProduct', (product, products)=>{
    //here i should populate the realtime list
})

// const populateProductList=()=>{
//     fetch('')
//         .then(data=>{
//             return data.json()
//         })
//         .then(products=>{
            
//             products.forEach(product=>{
//                 ul+=`<li>${product.name}</li><br>`
//             })

//             let ulProducts = document.getElementById('products-ul')
//             ulProducts.innerHTML=ul
//         })
// }

// populateProductList()
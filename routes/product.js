const express = require('express');

const router = express.Router();
const Product = require('../model/product.js');



router.get('/products', (req,res) => {
    Product.find({}).then(p => res.status(200).json(p))
    .catch(err => res.status(400).json(err))

});

router.get('/products/:id',(req,res) => {
    id = req.params.id;
    Product.findById(id)
    .then(product => {
        if(product===null){   
            res.status(400).send("No product found");
        }
       else res.status(200).json(product)})
    .catch(err => res.status(400).json({err}))
});

router.post('/products', (req,res)=>{
    
    const newProdcut = {
        _id: req.body._id,
        name: req.body.name,
        type:req.body.type,
        price:req.body.price,
        rating:req.body.rating,
        warranty_years:req.body.warranty_years,
        available: req.body.available
    };
    console.log(newProdcut);
    if(newProdcut == null){
        res.status(400).send("Something went wrong!")
    }   
    else{Product.create(newProdcut).then(res.status(201).send(newProdcut)).catch(err => res.status(400).send(err))};
 
});

router.put('/products/:id', (req,res) =>{
    id = req.params.id;
    productToUpdate = req.body;
    
    Product.findById(id, productToUpdate => {
        if(productToUpdate){
            productToUpdate.name = req.body.name;
            productToUpdate.type = req.body.type;
            productToUpdate.price = req.body.price;
            productToUpdate.rating = req.body.rating;
            productToUpdate.available = req.body.available;

            Product.update(id, productToUpdate);
            console.log(productToUpdate)
            res.status(200).json({
                message: 'Message updated successfully.',
                data: productToUpdate
            })
        }
        else {
            res.status(200).json({
                message: 'Product not found.'
            })
        }
})
});

router.delete('/products/:id', (req,res)=>{
    id = req.params.id;
    Product.findByIdAndRemove(id)
    .then(product => {
        if(product === null){
            res.status(400).send("Product does not exits")
        }
        else{
            res.status(200).json(product)
        }
    })
    .catch(err => res.status(400).json({err}))
});


module.exports = router;
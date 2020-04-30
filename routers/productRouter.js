const express = require('express')
const {productcontrollers} = require('./../controllers')

const router=express.Router()

router.get('/allproduct',productcontrollers.allproduct)
router.post('/addproduct',productcontrollers.addProduct)
router.patch('/editproduct/:id',productcontrollers.editproducts)
router.delete('/deleteproduct/:id',productcontrollers.deleteproduct)
module.exports=router
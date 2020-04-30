const express = require ('express')
const {inventorycontrollers} = require('./../controllers')

const router=express.Router()

router.get('/allinventory',inventorycontrollers.allinventory)
router.delete('/deleteinventory',inventorycontrollers.deleteinventory)
router.patch('/editinventory',inventorycontrollers.editinventory)

module.exports=router
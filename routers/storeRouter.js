const express = require ('express')
const {storecontrollers} = require('./../controllers')

const router=express.Router()

router.get('/allstore',storecontrollers.allstore)
router.post('/addstore',storecontrollers.addstore)
router.delete('/deletestore/:id',storecontrollers.deletestore)
router.patch('/editstore/:id',storecontrollers.editstore)

module.exports=router
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')



const PORT=5000


const app=express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
const {productRouters}=require('./routers')
// const {inventoryRouters}=require('./routers')
const {storeRouters}=require('./routers')

app.get('/',(req,res)=>{
    res.send('<h1>ujian backend </h1>')
})

app.use('/product',productRouters)
// app.use('/inventory',inventoryRouters)
app.use('/store',storeRouters)



app.listen(PORT,()=>console.log(`api jalan di port ${PORT}`))
const {db} =require('./../connection')
const {uploader} =require('./../helper/uploader')
const {fs}=require('fs')

module.exports={
    allproduct:(req,res)=>{
      db.query(`select * from product`,(err,result)=>{
          if(err)return res.status(500).send(err)
          return res.status(200).send(result)
      })  
    },
    addProduct: (req, res) => {
      const path = '/product'
          const upload = uploader(path, 'PROD').fields([{ name : 'image' }]);
          upload(req, res, (err) => {
              const { image } = req.files;
              const { nama, harga } = JSON.parse(req.body.data)
              const imagePath = image ? `${path}/${image[0].filename}` : null
      
              let sql = `INSERT INTO product (nama, harga, imagePath) VALUES ('${nama}', ${harga}, '${imagePath}')`
              db.query(sql, req.body, (err, result) => {
                  if(err){
                      fs.unlinkSync(`./public${imagePath}`)
                      res.status(500).send(err.message)
                  }
                  res.status(200).send(result)
              })
          })
      },
      editproducts:(req,res)=>{
        const {id}=req.params
        var sql=`select * from product where product_id=${id}`
        db.query(sql, (err,result)=>{
            if(err) res.status(500).send(err)
            if(result.length) {
                try {
                    const path='/product'
                    const upload=uploader(path, 'IMG').fields([{name: 'image'}])
                    upload (req, res, (err)=>{
                        if(err) {
                            return res.status(500).json({message: 'Upload Post Picture Failed !', error: err.message});        
                        }
                        console.log('upload edit foto success')
                        const { image } = req.files
                        const imagePath = image ? path + '/' + image[0].filename : null
                        const data = JSON.parse(req.body.data)
                        if(imagePath) {
                            data.imagePath=imagePath
                        }
                        sql = `Update product set ? where product_id = ${id}`
                        db.query(sql,data,(err1,result1)=>{
                            if(err1) {
                                if(imagePath) {
                                    fs.unlinkSync('./public' + imagePath)
                                }
                                return res.status(500).json({message:"There's an error on the server", error: err1.message})
                            }
                            if(imagePath) {
                                if(result[0].imagePath) {
                                    fs.unlinkSync('./public' + result[0].imagePath)
                                }
                            }
                            sql=`select * from products`
                            db.query(sql, (err1, result3)=>{
                                if(err1) return res.status(500).send(err1)
                                return res.status(200).send(result3)
                            })
                        })
                    })
                } catch (error) {
                    
                }
            }else{
                return res.status(500).send({message:'id tidak ditemukan'})
            }
        })
    },
      deleteproduct:(req,res)=>{
        let { id } = req.params
        let sql = `select * from product where product_id = ${id}`;
        db.query(sql, (err, results) => {
            if(err)res.status(500).send(err.message)
    
            const oldImagePath = results[0].imagePath
            let sql = `delete from product where product_id = ${id}`;
            db.query(sql, (err, response) => {
                if(err)res.status(500).send(err.message)
                fs.unlinkSync(`./public${oldImagePath}`)
                res.status(200).send({
                    status : "successful deleted",
                    message : "data has deleted"
                })
            })
        })
    },
    
  }
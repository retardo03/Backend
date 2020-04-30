const {db} =require('./../connection')

module.exports={
    allstore:(req,res)=>{
      db.query(`select * from store`,(err,result)=>{
          if(err)return res.status(500).send(err)
          return res.status(200).send(result)
      })  
    },
    addstore:(req,res)=>{
        let sql = `insert into store set ?`;
        db.query(sql, req.body, (err, results) => {
            if(err)res.status(500).send(err.message)
            res.status(200).send({
                status : "successful added",
                message : "store has created"
            })
        })
    },
    deletestore:(req,res)=>{
        const {id}=req.params
        var sql=`delete from store where store_id=${id}`
        db.query(sql,(err,result1)=>{
           if(err) res.status(500).send(err)
           var sql='select * from store'
           db.query(sql,(err,result)=>{
           if(err) res.status(500).send(err)
           res.status(200).send(result)
       })
        })
    },
    editstore:(req,res)=>{
        const {id}=req.params
        const updatestore=req.body
        var sql=`update store set ? where store_id=${id}`
        db.query(sql,updatestore,(err,result)=>{
            if(err) res.status(500).send(err)
            var sql='select * from store'
           db.query(sql,(err,result1)=>{
           if(err) res.status(500).send(err)
           res.status(200).send(result1)
       })
        })
    }
}  
const pool=require("../config/mysql");
exports.createStore=async(req,res)=>{
    try{
        const{
            name,
            address,
            latitude,
            longitude
        }=req.body;
        const [result]=await pool.query(
            `
            INSERT INTO stores
            (
              name,
              address,
              latitude,
              longitude
            )
            VALUES(?,?,?,?)
            `,
            [
                name,
                address,
                latitude,
                longitude
            ]
        );
        res.status(201).json({
            message:"Store Is Registered",
        })
    } catch(error){
        console.log(error);
        res.status(500).json({
            message:"Server Error"
        })
    }
};
exports.getStore=async(req,res)=>{
    try{
        const [stores]=await pool.query(
        `
        SELECT * FROM stores
        `
        );
        res.status(201).json(stores);
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Server Error"
        })
    }

};

exports.getStoresById=async(req,res)=>{
    try{
        const {id}=req.params;
        const [store]=await pool.query(
            `
            SELECT * FROM stores
            WHERE id:?
            `,
            [id]
        );
        if (store.length===0){
            res.status(500).json({
                message:"No Store found"
            });
        }res.status(200).json(store[0]);
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Server Error"
        })
    }
};
exports.updateStores=async(req,res)=>{
    try{
        const{id}=req.params;
        const{
            name,
            address,
            latitude,
            longitude
        }=req.body;
        const [result]=await pool.query(
            `
            UPDATE stores
            SET
            name=?,
            address=?,
            latitude=?,
            longitude=?,
            WHERE id=?
            `,
            [
                name,
                address,
                latitude,
                longitude,
                id
            ]
        );
        if (result.affectedRows===0){
            res.status(404).json({
                message:"Store unavailable at that location"
            });
        }
        res.status(200).json({
            message:"Store updated"
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Server Error"
        })
    }
};

exports.deleteStore=async(req,res)=>{
    try{
        const {id} = req.params;
        const [result] = await pool.query(
            `
            DELETE FROM stores
            WHERE id = ?
            `,
            [id]
        );
        if (result.affectedRows===0){
            res.status(404).json({
                message:"Store not Found"
            })
        }
        res.status(200).json({
            message:"Store is Successfully Deleted"
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Server Error"
        });
    }
};

/*

After a DELETE query, MySQL does not return rows.

Instead it returns information about what happened.

affectedRows: 1
*/
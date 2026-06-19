const express=require("express");
const router=express.Router();

const {
    createStore,
    getStore,
    getStoresById,
    updateStores,
    deleteStore
}=require("../controllers/storeController");
router.post("/",createStore);
router.get("/",getStore);
router.get("/:id",getStoresById);
router.put("/:id",updateStores);
router.delete("/:id",deleteStore);

module.exports=router;
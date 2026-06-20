const express = require("express");
const router = express.Router();

const {
    createStore,
    getStore,
    getStoresByLocation,
    updateStores,
    deleteStore,
    searchStores
} = require("../controllers/storeController");
router.post("/", createStore);
router.get("/", getStore);
router.get("/location", getStoresByLocation);
router.put("/:id", updateStores);
router.delete("/:id", deleteStore);
router.get("/search", searchStores)

module.exports = router;
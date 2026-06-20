const express = require("express");
const router = express.Router();

const {
    createInventory,
    getInventory,
    getInventoryByStore,
    updateInventory,
    deleteInventory
} = require("../controllers/inventoryController");

router.post("/", createInventory);

router.get("/", getInventory);

router.get("/store/:storeId",
    getInventoryByStore);

router.put("/:id",
    updateInventory);

router.delete("/:id",
    deleteInventory);

module.exports = router;
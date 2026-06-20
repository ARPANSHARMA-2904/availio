const express = require("express");
const router = express.Router();

const { getNearByStores } = require("../controllers/getNearByStoresController");

router.get("/", getNearByStores);

module.exports = router;
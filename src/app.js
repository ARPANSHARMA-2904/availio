const express = require("express");
const productRoutes = require("./routes/productRoutes");
const searchRoutes = require("./routes/searchRoutes");
const storeRoutes = require("./routes/storeRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const getNearByStores = require("./routes/getNearByRoutes");
const path = require("path");

const pool = require("./config/mysql");
const driver = require("./config/neo4j");

const app = express();

app.use(express.json());

//Routes
app.use("/products", productRoutes);
app.use("/search",searchRoutes);
app.use("/store",storeRoutes);
app.use("/inventory",inventoryRoutes);
app.use("/nearbyStores",getNearByStores);

app.set("view engine", "ejs");

app.set(
    "views",
    path.join(__dirname, "views")
);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home");
});

//---------TO TEST THE NEO4J CONNECTION----------

// app.get("/neo-test", async (req, res) => {

//     const session = driver.session();

//     try {
//         const result = await session.run(
//             "RETURN 'Neo4j Connected!' AS message"
//         );

//         const message = result.records[0]
//             .get("message");

//         res.json({ message });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error: "Neo4j error"
//         });

//     } finally {
//         await session.close();
//     }

// });


//------------TO CHECK MYSQL CONNECTION-------------
// app.get("/mysql-test", async (req, res) => {

//     try {
//         const [rows] = await pool.query(
//             "SELECT 1 + 1 AS result"
//         );

//         res.json({
//             message: "MySQL Connected!",
//             result: rows[0].result
//         });

//     } catch (err) {
//         console.error(err);

//         res.status(500).json({
//             error: "MySQL connection failed"
//         });
//     }

// });

module.exports = app;
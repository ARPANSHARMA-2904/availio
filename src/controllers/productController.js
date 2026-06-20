const pool = require("../config/mysql");

exports.createProduct = async (req, res) => {
    try {
        const {
            name,
            brand,
            category_id,
            barcode } = req.body;
        const [result] = await pool.query(
            `
            INSERT INTO products
            (
                name,
                brand,
                category_id,
                barcode
            )
            VALUES (?, ?, ?, ?)
            `,
            [
                name,
                brand,
                category_id,
                barcode
            ]
        );

        res.status(201).json({
            message: "Product Created",
            id: result.insertId
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        })
    }
};

exports.getProducts = async (req, res) => {
    try {
        const [products] = await pool.query(
            `
            SELECT *
            FROM products
            `
        );
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        })
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const [product] = await pool.query(
            `
            SELECT *
            FROM products
            WHERE id = ?
            `,
            [id]
        );
        if (product.length == 0) {
            return res.status(404).json({
                message: "Error, no Product Found"
            });
        }
        res.status(200).json(product[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        })
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            brand,
            category_id,
            barcode
        } = req.body;

        const [result] = await pool.query(
            `
            UPDATE products
            SET
                name = ?,
                brand = ?,
                category_id = ?,
                barcode = ?
            WHERE id = ?
            `,
            [
                name,
                brand,
                category_id,
                barcode,
                id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product updated"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        })
    }
};

exports.deleteProduct = async (req, res) => {
    try {

        const { id } = req.params;
        const [result] = await pool.query(`
                DELETE FROM products
                WHERE id = ?
                `,
            [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};
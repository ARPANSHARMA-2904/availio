const pool = require("../config/mysql");

exports.createInventory = async (req, res) => {
    try {

        const {
            store_id,
            product_id,
            quantity,
            price
        } = req.body;

        const [result] = await pool.query(
            `
            INSERT INTO inventory
            (
                store_id,
                product_id,
                quantity,
                price
            )
            VALUES (?, ?, ?, ?)
            `,
            [
                store_id,
                product_id,
                quantity,
                price
            ]
        );

        res.status(201).json({
            message: "Inventory added",
            id: result.insertId
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

exports.getInventory = async (req, res) => {
    try {

        const [inventory] = await pool.query(
            `
            SELECT *
            FROM inventory
            `
        );

        res.status(200).json(inventory);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

exports.getInventoryByStore = async (req, res) => {
    try {

        const { storeId } = req.params;

        const [inventory] = await pool.query(
            `
            SELECT
                i.id,
                p.name AS product_name,
                p.brand,
                i.quantity,
                i.price,
                i.last_updated
            FROM inventory i
            JOIN products p
                ON i.product_id = p.id
            WHERE i.store_id = ?
            `,
            [storeId]
        );

        res.status(200).json(inventory);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

exports.updateInventory = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            quantity,
            price
        } = req.body;

        const [result] = await pool.query(
            `
            UPDATE inventory
            SET
                quantity = ?,
                price = ?
            WHERE id = ?
            `,
            [
                quantity,
                price,
                id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Inventory not found"
            });
        }

        res.status(200).json({
            message: "Inventory updated"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

exports.deleteInventory = async (req, res) => {
    try {

        const { id } = req.params;

        const [result] = await pool.query(
            `
            DELETE FROM inventory
            WHERE id = ?
            `,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Inventory not found"
            });
        }

        res.status(200).json({
            message: "Inventory deleted"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};
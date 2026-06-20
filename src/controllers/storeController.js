require("dotenv").config();
const { getCoordinates } = require("./../utils/geocode");
const pool = require("../config/mysql");

exports.createStore = async (req, res) => {
    try {

        const {
            name,
            address
        } = req.body;

        const {
            latitude,
            longitude
        } = await getCoordinates(address);

        const searchName = name
            .toLowerCase()
            .replace(/\s+/g, '');

        const [result] = await pool.query(
            `
            INSERT INTO stores
            (
                name,
                search_name,
                address,
                latitude,
                longitude
            )
            VALUES (?, ?, ?, ?, ?)
            `,
            [
                name,
                searchName,
                address,
                latitude,
                longitude
            ]
        );

        res.status(201).json({
            message: "Store Registered",
            storeId: result.insertId,
            latitude,
            longitude
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

exports.getStore = async (req, res) => {
    try {

        const [stores] = await pool.query(
            `
            SELECT *
            FROM stores
            `
        );

        res.status(200).json(stores);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

exports.getStoresByLocation = async (req, res) => {
    try {

        const { location } = req.query;

        if (!location) {
            return res.status(400).json({
                message: "Location is required"
            });
        }

        const {
            latitude,
            longitude
        } = await getCoordinates(location);

        const [stores] = await pool.query(
            `
            SELECT
                *,
                (
                    6371 * ACOS(
                        COS(RADIANS(?))
                        * COS(RADIANS(latitude))
                        * COS(
                            RADIANS(longitude)
                            - RADIANS(?)
                        )
                        +
                        SIN(RADIANS(?))
                        * SIN(RADIANS(latitude))
                    )
                ) AS distance_km
            FROM stores
            HAVING distance_km <= 5
            ORDER BY distance_km ASC
            `,
            [
                latitude,
                longitude,
                latitude
            ]
        );

        res.status(200).json({
            location,
            coordinates: {
                latitude,
                longitude
            },
            count: stores.length,
            stores
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

exports.updateStores = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            name,
            address
        } = req.body;

        if (!name || !address) {
            return res.status(400).json({
                message: "Name and address are required"
            });
        }

        const {
            latitude,
            longitude
        } = await getCoordinates(address);

        const searchName = name
            .toLowerCase()
            .replace(/\s+/g, '');

        const [result] = await pool.query(
            `
            UPDATE stores
            SET
                name=?,
                search_name=?,
                address=?,
                latitude=?,
                longitude=?
            WHERE id=?
            `,
            [
                name,
                searchName,
                address,
                latitude,
                longitude,
                id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Store not found"
            });
        }

        res.status(200).json({
            message: "Store updated"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

exports.deleteStore = async (req, res) => {
    try {

        const { id } = req.params;

        const [result] = await pool.query(
            `
            DELETE FROM stores
            WHERE id = ?
            `,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Store not found"
            });
        }

        res.status(200).json({
            message: "Store deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

exports.searchStores = async (req, res) => {
    try {



        const { query } = req.query;

        if (!query) {
            return res.status(400).json({
                message: "Search query is required"
            });
        }

        const search = query
            .toLowerCase()
            .replace(/\s+/g, '');

        const [stores] = await pool.query(
            `
            SELECT *
            FROM stores
            WHERE
            REPLACE(
                LOWER(name),
                ' ',
                ''
            ) LIKE ?
            `,
            [`%${search}%`]
        );

        res.status(200).json(stores);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

/*

After a DELETE query, MySQL does not return rows.

Instead it returns information about what happened.

affectedRows: 1
*/
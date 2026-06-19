const pool = require("../config/mysql");

exports.searchProduct = async (req, res) => {
    try {
        const {
            query,
            lat,
            lng
        } = req.query;

        if (!query || !lat || !lng) {
            return res.status(400).json({
                message: " query,lat and lng is required"
            });
        }

        const [rows] = await pool.query(
            `
            SELECT
            p.id AS product_id,
            p.name AS product_name,

            s.id AS store_id,
            s.name AS store_name,
            s.address,

            i.quantity,
            i.price,

        (
            6371 * ACOS(
            COS(RADIANS(?))
            * COS(RADIANS(s.latitude))
            * COS(RADIANS(s.longitude) - RADIANS(?))
            + SIN(RADIANS(?))
            * SIN(RADIANS(s.latitude))
        )
    ) AS distance_km

FROM products p

JOIN inventory i
    ON p.id = i.product_id

JOIN stores s
    ON s.id = i.store_id

WHERE
    p.name LIKE ?
    AND i.quantity > 0

HAVING distance_km <= 10

ORDER BY distance_km ASC
`,
            [
                lat,
                lng,
                lat,
                `%${query}%`
            ]
        );

        const results = rows.map(row => ({
            product: row.product_name,
            store: row.store_name,
            address: row.address,
            stock: row.quantity,
            price: row.price,
            distance_km: Number(
                row.distance_km.toFixed(2)
            )
        }));

        res.json({
            search: query,
            count: results.length,
            results
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        })
    }
}
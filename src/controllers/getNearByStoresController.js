const pool = require("../config/mysql");

exports.getNearByStores = async (req, res) => {
    try {

        const latitude = parseFloat(req.query.latitude);
        const longitude = parseFloat(req.query.longitude);

        if (
            isNaN(latitude) ||
            isNaN(longitude)
        ) {
            return res.status(400).json({
                message: "Valid latitude and longitude are required"
            });
        }

        const [stores] = await pool.query(
            `
            SELECT
                id,
                name,
                address,
                latitude,
                longitude,
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
            count: stores.length,
            stores
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }
};
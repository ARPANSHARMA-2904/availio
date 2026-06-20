require('dotenv').config();
const axios = require("axios");

exports.getCoordinates = async (address) => {

    const response = await axios.get(
        "https://api.opencagedata.com/geocode/v1/json",
        {
            params: {
                q: address,
                key: process.env.OPEN_CAGE_API
            }
        }
    );

    const result = response.data.results[0];

    if (!result) {
        throw new Error("Address not found");
    }

    return {
        latitude: result.geometry.lat,
        longitude: result.geometry.lng
    };
};
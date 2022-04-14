const express = require('express');
const router = express.Router();


app.post('/nft', async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body);

        const result = await req.models.nft.createNFT(body.name, body.image_url, body.price, body.description);
        res.status(201).json(result);

    } catch (err) {
        console.error("Failed to create new NFT: ", err);
        // res.status(500).
    }
})

module.exports = router;

var express = require('express');
var router = express.Router();
const axios = require('axios')

/* GET users listing. */
router.get('/', async (req, res, next) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/list', {
            headers: {
                'X-API-Key': process.env.COIN_GECKO_API_KEY,
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error?.response?.statusText);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`, {
            headers: {
                'X-API-Key': process.env.COIN_GECKO_API_KEY,
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching coin data:',error?.response?.statusText);
        res.status(500).json({ error: 'Failed to fetch coin data' });
    }
});

router.get('/:id/chart', async (req, res, next) => {
    try {
        const { id } = req.params;

        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
            params: {
                vs_currency: 'usd',
                days: 7,
            },
            headers: {
                'X-API-Key': process.env.COIN_GECKO_API_KEY,
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching coin data:', error?.response?.statusText);
        res.status(500).json({ error: 'Failed to fetch coin data' });
    }
});
module.exports = router;


const express = require('express')
const app = express()
const port = 3001
const cors = require('cors');

app.use(cors());
app.use(express.json());

let state = {
    capital: 0,
    businesses:  [{
        name: 'lemonade',
        timeToProfit: 1,
        profitPerBusiness: 1,
        buyingCost: 4,
        quantity: 1,
        image: "./logo/business/lemonade.jpeg"
    }, {
        name: 'news-paper',
        timeToProfit: 5,
        profitPerBusiness: 60,
        buyingCost: 60,
        quantity: 0,
        image: "./logo/business/news-paper.jpeg"
    }]
}

app.get('/state', (req, res) => {
    res.json(state);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

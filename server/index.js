const express = require('express')
const app = express()
const port = 3001
const cors = require('cors');

app.use(cors());
app.use(express.json());

let state = {
    capital: 0,
    businesses: [{
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

function makeProfit({state, businessName}) {
    return {
        ...state,
        capital: state.capital + profit({business: state.businesses.find(b => b.name === businessName)})
    }
}

function profit({business}) {
    return business.quantity * business.profitPerBusiness;
}

function buybueiness({state, businessName}) {
    const businessToBuy = state.businesses.find(b=>b.name === businessName);
    if(businessToBuy && businessToBuy.buyingCost <= state.capital) {
        return {
            capital: state.capital - businessToBuy.buyingCost,
            businesses: state.buybueiness.map(b => {

            })
        }
    }
    return {
        ...state,
        businesses: state.businesses.map()
    }
}


app.get('/state', (req, res) => {
    res.json(state);
});

app.post('/makeprofit', (req, res) => {
    setTimeout(function () {
        state = makeProfit({state, businessName: req.body.businessName});
        console.log(JSON.stringify({state}, null, '\t'));
        res.json({capital: state.capital});
    }, state.businesses.find(b => b.name === req.body.businessName).timeToProfit * 1000);
});

app.post('/buybusiness', (req, res) => {
    businesses.map((businessState) => {
        return businessState.name === business.name ? {
            ...businessState,
            quantity: businessState.quantity + 1
        } : businessState;
    }));
    setCapital(capital - business.buyingCost);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

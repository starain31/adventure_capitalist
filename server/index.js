const express = require('express')
const app = express()
const port = 3001
const cors = require('cors');

app.use(cors());
app.use(express.json());

let state = require('./db.json');

function make_profit({state, business_name}) {
    return {
        ...state,
        capital: state.capital + profit({business: state.businesses.find(b => b.name === business_name)})
    }
}

function profit({business}) {
    return business.quantity * business.profit_per_business;
}

function find_business({businesses, business_name}) {
    return businesses.find(b=>b.name === business_name);
}

function is_eligible_to_buy({business_to_buy, capital}) {
    return business_to_buy && business_to_buy.buyingCost <= capital;
}

function buy_business({state, business_name}) {
    const business_to_buy = find_business({businesses: state.businesses, business_name});

    if(is_eligible_to_buy({business_to_buy, capital: state.capital})) {
        return {
            capital: state.capital - business_to_buy.buyingCost,
            businesses: state.businesses.map(b => {
                return b.name === business_name? {
                    ...b,
                    quantity: b.quantity + 1
                } : b;
            })
        }
    }
    return state;
}

function is_eligible_to_buy_manager({business_of_manager_to_buy, capital}) {
    return business_of_manager_to_buy &&
        !business_of_manager_to_buy.has_manager &&
        business_of_manager_to_buy.manager_buying_cost <= capital;
}

function buy_manager({state, business_name}) {
    const business_of_manager_to_buy = find_business({businesses: state.businesses, business_name});
    if(is_eligible_to_buy_manager({business_of_manager_to_buy, capital: state.capital})) {
        return {
            capital: state.capital - business_of_manager_to_buy.manager_buying_cost,
            businesses: state.businesses.map(b => {
                return b.name === business_name? {
                    ...b,
                    has_manager: true
                } : b;
            })
        }
    }
    return state;
}

app.get('/state', (req, res) => {
    res.json(state);
});

app.post('/make_profit', (req, res) => {
    const business_name = req.body.business_name;

    setTimeout(function () {
        state = make_profit({state, business_name});
        res.json({capital: state.capital});
    }, find_business({businesses: state.businesses, business_name}).time_to_profit * 1000);
});

app.post('/buy_business', (req, res) => {
    state = buy_business({state, business_name: req.body.business_name});
    res.json(state);
});

app.post('/buy_manager', (req, res) => {
   state = buy_manager({state, business_name: req.body.business_name});
    console.log(state);

    res.json(state);
});

app.listen(port, () => {
    console.log(`Adventure capitalist backend listening at http://localhost:${port}`)
})

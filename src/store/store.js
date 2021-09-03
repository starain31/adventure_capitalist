import {atom} from "recoil";

export const capitalState = atom({
    key: 'capitalState',
    default: 0,
});
export const businessState = atom({
    key: 'businessState',
    default: [{
        name: 'lemonade',
        timeToProfit: 3,
        profitPerBusiness: 100
    }, {
        name: 'news-paper',
        timeToProfit: 10,
        profitPerBusiness: 1000
    }]
});
import {atom, selectorFamily} from "recoil";

export const capitalState = atom({
    key: 'capitalState',
    default: 0,
});

export const businessState = atom({
    key: 'businessState',
    default: []
});

export const isBusinessOwnedState = selectorFamily({
    key: "isBusinessOwned",
    get: (name) => ({get}) => {
        return get(businessState).find((business) => business.name === name).quantity !== 0;
    }
})

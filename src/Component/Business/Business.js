import {useRecoilState, useRecoilValue} from "recoil";
import {businessState, capitalState, isBusinessOwnedState} from "../../store/store";
import styles from "./Business.module.css";


export function Business({business}) {
    const [capital, setCapital] = useRecoilState(capitalState);
    const isBusinessOwned = useRecoilValue(isBusinessOwnedState(business.name));
    const [businesses, setBusinesses] = useRecoilState(businessState);

    function makeProfit() {
        fetch("http://localhost:3001/makeprofit", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                businessName: business.name
            })
        })
            .then(response => response.json())
            .then(({capital, businesses}) => {
                setCapital(capital);
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    function buyBusiness() {
        if (business.buyingCost <= capital) {
            fetch("http://localhost:3001/buybusiness", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    businessName: business.name
                })
            })
                .then(response => response.json())
                .then(({businesses, capital}) => {
                    setBusinesses(businesses);
                    setCapital(capital);
                })
                .catch(function (e) {
                    console.error(e);
                });

        }
    }

    return <div>
        <div className={styles.logo}>
            <img style={{borderRadius: "50%", height: "10vmin"}} src={business.image} alt={business.name}/>
        </div>
        <div className={styles.button}>
            QUANTITY: {business.quantity}
        </div>
        <div
            onClick={makeProfit}
            className={styles.asyncButton}
            style={{transition: isBusinessOwned ? `width ${business.timeToProfit}s linear, opacity 0.5s ease ${business.timeToProfit}s` : ""}}
        >
            EARN: {business.profitPerBusiness * business.quantity}
        </div>
        <div className={styles.button}
             onClick={buyBusiness}
        >
            BUY x 1 for ${business.buyingCost}
        </div>
    </div>
}

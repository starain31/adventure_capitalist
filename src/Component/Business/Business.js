import {useRecoilState, useRecoilValue} from "recoil";
import {businessState, capitalState, isBusinessOwnedState} from "../../store/store";
import styles from "./Business.module.css";


export function Business({business}) {
    const [capital, setCapital] = useRecoilState(capitalState);
    const isBusinessOwned = useRecoilValue(isBusinessOwnedState(business.name));
    const [businesses, setBusinesses] = useRecoilState(businessState);

    function make_profit() {
        fetch("http://localhost:3001/make_profit", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                business_name: business.name
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

    function buy_business() {
        if (business.buyingCost <= capital) {
            fetch("http://localhost:3001/buy_business", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    business_name: business.name
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
            onClick={make_profit}
            className={styles.asyncButton}
            style={{transition: isBusinessOwned ? `width ${business.time_to_profit}s linear, opacity 0.5s ease ${business.time_to_profit}s` : ""}}
        >
            EARN: {business.profit_per_business * business.quantity}
        </div>

        <div className={styles.button}
             onClick={buy_business}
        >
            BUY x 1 for ${business.buyingCost}
        </div>
    </div>
}

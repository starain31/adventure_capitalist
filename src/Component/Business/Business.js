import {useRecoilState, useRecoilValue} from "recoil";
import {businessState, capitalState, isBusinessOwnedState} from "../../store/store";
import styles from "./Business.module.css";



export function Business({business}) {
    const [capital, setCapital] = useRecoilState(capitalState);
    const isBusinessOwned = useRecoilValue(isBusinessOwnedState(business.name));
    const [businessesState, setBusinessesState] = useRecoilState(businessState);

    function makeProfit() {
        setTimeout(function () {
            setCapital(capital + (business.profitPerBusiness*business.quantity));
        }, business.timeToProfit * 1000)
    }

    function buyBusiness() {
        if(business.buyingCost <= capital) {
            setBusinessesState(businessesState.map((businessState) => {
                return businessState.name === business.name ? {
                    ...businessState,
                    quantity: businessState.quantity + 1
                } : businessState;
            }));
            setCapital(capital-business.buyingCost);
        }
    }

    return <div>
        <div className={styles.logo}>
            <img style={{ borderRadius: "50%", height: "10vmin"}} src={business.image} alt={business.name}/>
        </div>
        <div className={styles.button}>
            QUANTITY: {business.quantity}
        </div>
        <div
            onClick={makeProfit}
            className={styles.asyncButton}
            style={{transition: isBusinessOwned?`width ${business.timeToProfit}s linear, opacity 0.5s ease ${business.timeToProfit}s`:""}}
        >
            EARN: { business.profitPerBusiness* business.quantity}
        </div>
        <div className={styles.button}
             onClick={buyBusiness}
        >
            BUY x 1 for ${business.buyingCost}
        </div>
    </div>
}

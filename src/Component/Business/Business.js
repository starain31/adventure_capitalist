import {useRecoilState} from "recoil";
import {capitalState} from "../../store/store";
import styles from "./Business.module.css";

export function Business({business}) {
    const [capital, setCapital] = useRecoilState(capitalState);

    function handleClick() {
        setTimeout(function () {
            setCapital(capital + business.profitPerBusiness);
        }, business.timeToProfit * 1000)
    }

    return <div
        onClick={handleClick}
        className={styles.asyncButton}
        style={{transition: `width ${business.timeToProfit}s linear, opacity 0.5s ease ${business.timeToProfit}s`}}
    >
        {business.name}
    </div>;
}
import {useRecoilState} from "recoil";
import {businessState, capitalState} from "../store/store";
import logo from "../logo.svg";
import {Capital} from "./Capital/Capital";
import {Business} from "./Business/Business";
import {useEffect} from "react";

export function Root() {
    const [businesses, setBusinessState] = useRecoilState(businessState);
    const [,setCapitalState] = useRecoilState(capitalState);

    useEffect(() => {
        fetch("http://localhost:3001/state").then(resp => resp.json()).then(({capital, businesses}) => {
            setCapitalState(capital);
            setBusinessState(businesses);

        })
    });

    return <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <Capital/>
            <ul style={{listStyleType: "none"}}>
                {
                    businesses.map(business => <li key={business.name}><Business business={business}/><br/></li>)
                }
            </ul>
        </header>
    </div>;
}

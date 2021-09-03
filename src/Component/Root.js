import {useRecoilState} from "recoil";
import {businessState} from "../store/store";
import logo from "../logo.svg";
import {Capital} from "./Capital/Capital";
import {Business} from "./Business/Business";

export function Root() {
    const [businesses] = useRecoilState(businessState);

    return <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <Capital/>
            <ul>
                {
                    businesses.map(business => <li><Business business={business}/></li>)
                }
            </ul>
        </header>
    </div>;
}
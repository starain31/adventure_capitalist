import logo from './logo.svg';
import './App.css';
import {atom, RecoilRoot, useRecoilState} from "recoil";

const capitalState = atom({
    key: 'capitalState',
    default: 105,
});

function Capital() {
    const [capital, capitalText] = useRecoilState(capitalState);

    return <h4>${capital}</h4>;
}

function App() {
    return (
        <RecoilRoot>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <Capital/>
                </header>
            </div>
        </RecoilRoot>
    );
}

export default App;

import {useRecoilState} from "recoil";
import {capitalState} from "../../store/store";

export function Capital() {
    const [capital] = useRecoilState(capitalState);
    return <h4>${capital}</h4>;
}
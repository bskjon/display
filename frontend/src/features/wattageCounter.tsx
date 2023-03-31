import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { updateWattage } from "../app/stores/wattage-slice";
import {  useWattageSubscription } from "../app/ws/wattage-sub"
import Counter from "../components/Counter/Counter"


export function WattageCounter() {
    const wattageValue = useSelector((state: RootState) => state.wattage.value);
    const dispatch = useDispatch();

    const height = "10rem"
    useWattageSubscription((value) => {
        dispatch(updateWattage(value.wattage))
    });


    return(
        <div style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <span style={{ height: height, fontSize: height, lineHeight: 1, color: "#00a8e6" }}>W</span>
            <Counter height={height} value={wattageValue}  />
        </div>
    )
}
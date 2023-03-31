
import ThermostatIcon from '@mui/icons-material/Thermostat';
import Co2Icon from '@mui/icons-material/Co2';
import OpacityIcon from '@mui/icons-material/Opacity';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { updateHumidity } from '../app/stores/humidity-slice';
import { updateTemperature } from '../app/stores/temperature-slice';
import { useCo2Subscription, useHumiditySubscription, useTemperatureSubscription } from '../app/ws/climate-sub';
import Climate from '../components/climate';
import { updateCo2 } from '../app/stores/co2-slice';


export interface ClimateProps {
    size: string
}
export function Temperature({size = "10rem"}: ClimateProps) {
    const dispatch = useDispatch();
    const temperature = useSelector((state: RootState) => state.temperature);

    useTemperatureSubscription((value) => {
        dispatch(updateTemperature(value));
    });

    const latest = (temperature.latestId) ? temperature.value[temperature.latestId] : null
    return (
        <Climate 
            title={latest?.where}
            icon={{
                icon: <ThermostatIcon />,
                color: "red",
                size: size
            }}
            data={{
                size: "7.5rem",
                unit: latest?.unit,
                value: latest?.value
            }}
        />
    )
}

export function Humidity({size = "10rem"}: ClimateProps) {
    const dispatch = useDispatch();
    const humidity = useSelector((state: RootState) => state.humidity);

    useHumiditySubscription((value) => {
        dispatch(updateHumidity(value));
    });

    const latest = (humidity.latestId) ? humidity.value[humidity.latestId] : null
    return (
        <Climate 
            title={latest?.where}
            icon={{
                icon: <OpacityIcon />,
                color: "#00a8e6",
                size: size
            }}
            data={{
                size: "7.5rem",
                unit: latest?.unit,
                value: latest?.value
            }}
        />
    )
}

export function Co2({size = "10rem"}: ClimateProps) {
    const dispatch = useDispatch();
    const co2 = useSelector((state: RootState) => state.co2);

    useCo2Subscription((value) => {
        dispatch(updateCo2(value));
    });

    const latest = (co2.latestId) ? co2.value[co2.latestId] : null
    return (
        <Climate 
            title={latest?.where}
            icon={{
                icon: <Co2Icon />,
                color: "gray",
                size: size
            }}
            data={{
                size: "7.5rem",
                unit: latest?.unit,
                value: latest?.value
            }}
        />
    )
}
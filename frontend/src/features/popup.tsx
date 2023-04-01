import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { showPopup } from '../app/stores/popup-visibility-slice';
import { Co2, Humidity, Temperature } from './climates';

export function Popup() {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [showTemperature, setTemperatureVisibility] = useState(false);
    const [showHumidity, setHumidityVisibility] = useState(false);
    const [showCo2, setCo2Visibility] = useState(false);
    const popupVisible = useSelector((state: RootState) => state.popup.visible);



    const temperatureValue = useSelector((state: RootState) => state.temperature);
    const humidityValue = useSelector((state: RootState) => state.humidity);
    const co2Value = useSelector((state: RootState) => state.co2);
  
    useEffect(() => {
        if (temperatureValue.latestId) {
            setTemperatureVisibility(true);
            dispatch(showPopup())
        }
    }, [temperatureValue, dispatch])

    useEffect(() => {
        if (humidityValue.latestId) {
            setHumidityVisibility(true);
            dispatch(showPopup())
        }
    }, [humidityValue, dispatch])

    useEffect(() => {
        if (co2Value.latestId) {
            setCo2Visibility(true);
            dispatch(showPopup())
        }
    }, [co2Value, dispatch])

    useEffect(() => {
      if (popupVisible) {
        setVisible(true);
        const timer = setTimeout(() => {
          setVisible(false);
          if (showTemperature) {
            setTemperatureVisibility(false);
          }
          if (showHumidity) {
            setHumidityVisibility(false);
          }
          if (showCo2) {
            setCo2Visibility(false);
          }
        }, 7500);
        return () => {
          clearTimeout(timer);
        };
      }
    }, [popupVisible, showTemperature, showHumidity, showCo2]);

    
  return (
    <div style={{
        display: visible ? 'flex' : 'none',
        position: "fixed",
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(0, 0, 0, 0.75)",
        zIndex: 9,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    }}>
        <div style={{
            display: showTemperature ? 'flex' : 'none'
        }}>
            <Temperature size={"25"} />
        </div>
        <div style={{
            display: showHumidity ? 'flex' : 'none'
        }}>
            <Humidity size={"25"} />
        </div>
        <div style={{
            display: showCo2 ? 'flex' : 'none'
        }}>
            <Co2 size={"25"} />
        </div>
    </div>
  );
}


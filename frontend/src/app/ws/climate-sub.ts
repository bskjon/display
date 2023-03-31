import { Co2, Humidity, Temperature } from "../dto/climate.dto";
import { useWsSubscription } from "../ws";

export function useTemperatureSubscription(process: (data: Temperature) => void) {
    return useWsSubscription<Temperature>("/topic/temperature", process);
}

export function useHumiditySubscription(process: (data: Humidity) => void) {
    return useWsSubscription<Humidity>("/topic/humidity", process);
}

export function useCo2Subscription(process: (data: Co2) => void) {
    return useWsSubscription<Co2>("/topic/co2", process);
}
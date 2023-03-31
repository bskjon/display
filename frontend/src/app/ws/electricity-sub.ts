import { ElectricityMeter, ElectricityMeterNow, ElectricityPrice, ElectricityPriceNow } from "../dto/electricity.dto";
import { useWsSubscription } from "../ws";

export function useElectricityPriceSubscription(process: (data: ElectricityPrice) => void) {
    return useWsSubscription<ElectricityPrice>("/topic/electricity/price", process);
}

export function useElectricityPriceNowSubscription(process: (data: ElectricityPriceNow) => void) {
    return useWsSubscription<ElectricityPriceNow>("/topic/electricity/price/now", process);
}


export function useElectricityMeterSubscription(process: (data: ElectricityMeter) => void) {
    return useWsSubscription<ElectricityMeter>("/topic/electricity/meter", process)
}

export function useElectricityMeterCurrentSubscription(process: (data: ElectricityMeterNow) => void) {
    return useWsSubscription<ElectricityMeterNow>("/topic/electricity/meter/now", process)
}
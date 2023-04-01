import { Wattage } from "../dto/wattage.dto";
import { useWsSubscription } from "../ws";


export function useWattageSubscription(process: (data: Wattage) => void) {
    return useWsSubscription<Wattage>("/topic/electricity/consumption/live", process);
}

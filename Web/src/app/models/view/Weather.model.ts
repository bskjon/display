import { Views } from "./View.model"

export class Weather {
    current: string
    temperature: KV | null
    precipitation: KV | null
    wind: KV | null
    type = Views.WEATHER
}

export class KV {
    value: number
    unit: string
}

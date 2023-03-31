
export interface DatedNumberValue {
    at: number
    value: number
}

export interface ElectricityPrice {
    title: string,
    unit: string,
    start: string,
    end: string,
    today: Array<DatedNumberValue>
    tomorrow: Array<DatedNumberValue>
}

export interface ElectricityMeter {
    title: string,
    unit: string,
    hourly: Array<DatedNumberValue>,
    start: string,
    end: string
}

export interface ElectricityPriceNow {
    title: string,
    unit: string,
    current: number,
    level: string
}

export interface ElectricityMeterNow {
    title: string,
    unit: string,
    current: number,
}

export interface ElectricityGrid {
    level: number
}
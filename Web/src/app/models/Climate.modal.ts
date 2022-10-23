import { Views } from "./view/View.model"

export class Climate {
    id: string
    where: string
    value: number
    unit: string
    valueType: ClimateType
    type: Views
}

export enum ClimateType {
    TEMPERATURE     = "TEMPERATURE",
    CARBON_DIOXIDE  = "CARBON_DIOXIDE",
    HUMIDITY        = "HUMIDITY"
}
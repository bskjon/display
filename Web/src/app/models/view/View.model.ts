import { DatedNumberValue } from "./data/DatedNumberValue"

export class View {
    viewId: string
    type: ViewType
    views: Array<ViewItem>
}

export enum ViewType {
    ELECTRICITY             = "ELECTRICITY",
    ELECTRICITY_METER       = "ELECTRICITY_METER",
    WEATHER                 = "WEATHER",
    CLIMATE_TEMPERATURE     = "CLIMATE_TEMPERATURE",
    CLIMATE_HUMIDITY        = "CLIMATE_HUMIDITY",
    CLIMATE_CO2             = "CLIMATE_CO2",

}

export enum Views {
    GRAPH_ELECTRICITY_PRICE = "GRAPH_ELECTRICITY_PRICE",
    GRAPH_ELECTRICITY_CONSUMPTION = "GRAPH_ELECTRICITY_CONSUMPTION",
    ELECTRICITY_PRICE = "ELECTRICITY_PRICE",
    ELECTRICITY_PRICE_LEVEL = "ELECTRICITY_PRICE_LEVEL",
    ELECTRICITY_PRICE_MIN = "ELECTRICITY_PRICE_MIN",
    ELECTRICITY_PRICE_MAX = "ELECTRICITY_PRICE_MAX",
    ELECTRICITY_PRICE_AVG = "ELECTRICITY_PRICE_AVG",

    WEATHER = "WEATHER",
    CLIMATE = "CLIMATE",
    TEMPERATURE = "TEMPERATURE",
    PRECIPITATION = "PRECIPITATION",
    CARBON_DIOXIDE = "CARBON_DIOXIDE",
    HUMIDITY = "HUMIDITY",
    WIND = "WIND"

}

export interface ViewItem {
    viewItemId: string
    viewType: Views
    title: string
    value: any
}

export interface ViewItemUnit extends ViewItem {
    viewItemId: string
    viewType: Views
    title: string
    value: any
    unitOfMeasurement: string
}

export class ViewItemSingleDatedNumberBased implements ViewItem {
    viewItemId: string
    viewType: Views
    title: string
    value: DatedNumberValue
    unitOfMeasurement: string
}

export class ViewItemSingleNumberBased implements ViewItem {
    viewItemId: string
    viewType: Views
    title: string
    value: number
    unitOfMeasurement: string
}

export class ViewItemGraphElectricityBased implements ViewItem {
    viewItemId: string
    viewType: Views
    title: string
    value: Array<DatedNumberValue>
    unitOfMeasurement: string
}

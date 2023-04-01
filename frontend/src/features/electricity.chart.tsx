import { ElectricityPriceNow } from "../app/dto/electricity.dto";

export interface DatedNumberValue {
    at: number
    value: number
}

export const chartTheme = {
    mode: 'dark'
} as ApexTheme;

export const priceChartFill = {
    type: ["gradient", "solid"],
    gradient: {
        shadeIntensity: 0,
        colorStops: [
            [
            {
                offset: -100,
                color: '#370000', // Mørk rød
                opacity: 1
            },
            {
                offset: -20,
                color: '#ff0000', // Rød
                opacity: 1
            },
            {
                offset: 25,
                color: '#7d730d', // Gul
                opacity: 1
            },
            {
                offset: 80,
                color: '#00a300', //Lysegrønn
                opacity: 1
            },
            {
                offset: 100,
                color: '#327d0d', // Mørkegrønn
                opacity: 1
            }
    
            ]
        ],
        type: 'vertical'
    }
} as ApexFill;

export const chartStroke = {
    width: 0,
    curve: 'smooth'
} as ApexStroke

export const chart = {
    type: "line",
    stacked: false,
    background: '#000',
    toolbar: {
      show: false
    }
} as ApexChart

export const priceChartSeries = (title: string = "Undefined", prices: Array<DatedNumberValue> = []) => {
    return [
        {
            name: title,
            type: 'area',
            color: '#FFA500',
            data: transform(prices)
        }
    ] as ApexAxisChartSeries
}

export const meterChartSeries = (title: string = "Undefined", usage: Array<DatedNumberValue> = []) => {
    return [
        {
            name: title,
            type: 'bar',
            color: '#FFA500',
            data: transform(usage)
        }
    ] as ApexAxisChartSeries
}

export const priceChartNowAnnotation = (now: ElectricityPriceNow | undefined) => {
    if (now === undefined) {
        return {}
    }
    return {
        borderColor: '#775DD0',
        label: {
        style: {
            color: '#fff',
            background: '#775DD0'
        },
        text: "Nå",
        borderColor: '#775DD0'
        },
        x: now.current
    }
}

function transform(data: Array<DatedNumberValue>): { x: number; y: number; }[] {
    if (data.length === 0) {
        return [];
    }
    const transformed = data.map((value) => toSeriesData(value) )
    return transformed
}


function toSeriesData(value: DatedNumberValue): { x: number; y: number; } {
    return {
        x: value.at,
        y: value.value,
      }
    
  }
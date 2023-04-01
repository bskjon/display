import ReactApexChart from "react-apexcharts"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { updateCurrent, updateMeter } from "../app/stores/electricity-meter-slice";
import { updatePriceNow, updatePrices } from "../app/stores/electricity-price-slice";
import { useElectricityMeterCurrentSubscription, useElectricityMeterSubscription, useElectricityPriceNowSubscription, useElectricityPriceSubscription } from "../app/ws/electricity-sub"
import { chart, chartStroke, chartTheme, meterChartSeries, priceChartFill, priceChartNowAnnotation, priceChartSeries } from "./electricity.chart";

export interface color {
    bg: string,
    fg: string
}

export function ElectricityPriceBlock() {
    const price = useSelector((state: RootState) => state.electricityPrice.priceNow);


    const colorLevelMap: Record<string, color> = {
        VERY_EXPENSIVE: { bg: "rgb(255, 0, 0)", fg: "white" },
        EXPENSIVE: { bg: "rgb(150, 0, 0)", fg: "white" },
        AVERAGE: { bg: "rgb(255, 166, 0)", fg: "black" },
        CHEAP: { bg: "rgb(0, 180, 0)", fg: "white" },
        VERY_CHEAP: { bg: "green", fg: "white" },
    };

    const color = (price?.level) ? colorLevelMap[price?.level] : {bg: "red", fg: "white"};
    return(
        <div
            style={{
                display: (price) ? "flex" : "none",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                backgroundColor: color.bg,
                color: color.fg,
                height: "100%"
            }}
        >
            <p style={{
                fontSize: "10rem",
                fontWeight: "bolder",
                margin: 0
            }}>{price?.current}</p>
            <p style={{
                fontSize: "3rem",
                margin: 0
            }}>{price?.unit}</p>
        </div>
    )
}

export function ElectricityMeterGraphComponent() {
    const usage = useSelector((state: RootState) => state.electricityMeter);
    const dispatch = useDispatch();

    useElectricityMeterSubscription((value) => {
        dispatch(updateMeter(value))
    })
    useElectricityMeterCurrentSubscription((value) => {
        dispatch(updateCurrent(value))
    })


    return(
        <div style={{
            height: "100%",
            width: "100%",
            display: "block",
        }}>
            
            <ReactApexChart height="100%" width="100%"
                series={meterChartSeries(usage.meter?.title || "", usage.meter?.hourly || []) || []}  
                options={{
                    theme: chartTheme,
                   // fill: priceChartFill,
                    /*annotations: {
                        xaxis: [priceChartNowAnnotation(usage?.current)]
                    },*/
                    xaxis: {
                        title: {
                            text: usage.meter?.unit || "kWh" 
                        },
                        type: 'datetime'
                    },
                    stroke: chartStroke,
                    chart: chart,
                    
                }}
            />
            
        </div>
    )
}

export function ElectricityPriceGraphComponent() {
    const price = useSelector((state: RootState) => state.electricityPrice);
    const dispatch = useDispatch();

    useElectricityPriceSubscription((value) => {
        dispatch(updatePrices(value))
    })
    useElectricityPriceNowSubscription((value) => {
        dispatch(updatePriceNow(value))
    })
    
    //const chartOptions = priceOptions(price.prices.title, price.prices.today, price.priceNow, price.prices.unit);

    return(
        <div style={{
            height: "100%",
            width: "100%",
            display: "block",
        }}>
            
            <ReactApexChart height="100%" width="100%"
                series={priceChartSeries(price.prices?.title || "", price.prices?.today || []) || []}  
                options={{
                    theme: chartTheme,
                    fill: priceChartFill,
                    annotations: {
                        xaxis: [priceChartNowAnnotation(price?.priceNow)]
                    },
                    xaxis: {
                        title: {
                            text: price.prices?.unit || "kWh" 
                        },
                        type: 'datetime'
                    },
                    stroke: chartStroke,
                    chart: chart,
                    
                }}
            />
            
        </div>
    )
}

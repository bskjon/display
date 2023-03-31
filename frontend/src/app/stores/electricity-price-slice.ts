import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ElectricityPrice, ElectricityPriceNow } from "../dto/electricity.dto"

interface ElectricityPriceState {
    prices: ElectricityPrice | undefined
    priceNow: ElectricityPriceNow | undefined
    minPrice: number | undefined
    maxPrice: number | undefined
    avgPrice: number | undefined
}

const initialState: ElectricityPriceState = {
    prices: undefined,
    priceNow: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    avgPrice: undefined
}

const electricityPriceSlice = createSlice({
    name: "electricityPrice",
    initialState,
    reducers: {
        updatePrices(state, action: PayloadAction<ElectricityPrice>) {
            state.prices = action.payload;
        },
        updatePriceNow(state, action: PayloadAction<ElectricityPriceNow>) {
            state.priceNow = action.payload;
        },
        updateMinPrice(state, action: PayloadAction<number>) {
            state.minPrice = action.payload
        },
        updateMaxPrice(state, action: PayloadAction<number>) {
            state.maxPrice = action.payload
        },        
        updateAvgPrice(state, action: PayloadAction<number>) {
            state.avgPrice = action.payload
        }
    }
});

export const { updatePrices, updatePriceNow, updateAvgPrice, updateMaxPrice, updateMinPrice} = electricityPriceSlice.actions;
export default electricityPriceSlice.reducer;
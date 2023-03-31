import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ElectricityMeter, ElectricityMeterNow } from "../dto/electricity.dto";

interface ElectricityMeterState {
    meter: ElectricityMeter | undefined
    current: ElectricityMeterNow | undefined,
    unit: string
}

const initialState: ElectricityMeterState = {
    meter: undefined,
    current: undefined,
    unit: "kWh",
}

const electricityMeterSlice = createSlice({
    name: "electricityPrice",
    initialState,
    reducers: {
        updateMeter(state, action: PayloadAction<ElectricityMeter>) {
            state.meter = action.payload;
        },
        updateCurrent(state, action: PayloadAction<ElectricityMeterNow>) {
            state.current = action.payload;
        }
    }
});

export const { updateCurrent, updateMeter } = electricityMeterSlice.actions;
export default electricityMeterSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface WattageState {
    value: number,
    timestamp: string | undefined
}

const initialState: WattageState = {
    value: 0o000,
    timestamp: undefined
}

const wattageSlice = createSlice({
    name: "wattage",
    initialState,
    reducers: {
        updateWattage(state, action: PayloadAction<number>) {
            state.value = action.payload
        }
    }
})

export const { updateWattage } = wattageSlice.actions;
export default wattageSlice.reducer;
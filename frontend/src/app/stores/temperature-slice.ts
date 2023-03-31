import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Temperature } from "../dto/climate.dto"


interface TemperatureMap {
    [id: string]: Temperature
}

interface TemperatureState {
    value: TemperatureMap,
    latestId: string | null

}


const initialState: TemperatureState = {
    latestId: null,
    value: {}
}

const temperatureSlice = createSlice({
    name: "temperatureValues",
    initialState,
    reducers: {
        updateTemperature(state, action: PayloadAction<Temperature>) {
            const id = action.payload.id;
            state.latestId = id
            state.value[id] = action.payload
        }
    }
});

export const { updateTemperature } = temperatureSlice.actions;
export default temperatureSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Humidity } from "../dto/climate.dto"


interface HumidityMap {
    [id: string]: Humidity
}

interface HumidityState {
    value: HumidityMap,
    latestId: string | null

}


const initialState: HumidityState = {
    latestId: null,
    value: {}
}

const humiditySlice = createSlice({
    name: "humidityValues",
    initialState,
    reducers: {
        updateHumidity(state, action: PayloadAction<Humidity>) {
            const id = action.payload.id;
            state.latestId = id
            state.value[id] = action.payload
        }
    }
});

export const { updateHumidity } = humiditySlice.actions;
export default humiditySlice.reducer;
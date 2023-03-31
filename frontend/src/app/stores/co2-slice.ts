import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Co2 } from "../dto/climate.dto"


interface Co2Map {
    [id: string]: Co2
}

interface Co2State {
    value: Co2Map,
    latestId: string | null

}


const initialState: Co2State = {
    latestId: null,
    value: {}
}

const co2Slice = createSlice({
    name: "co2Values",
    initialState,
    reducers: {
        updateCo2(state, action: PayloadAction<Co2>) {
            const id = action.payload.id;
            state.latestId = id
            state.value[id] = action.payload
        }
    }
});

export const { updateCo2 } = co2Slice.actions;
export default co2Slice.reducer;
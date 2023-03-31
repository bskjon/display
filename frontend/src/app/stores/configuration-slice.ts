import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Layout } from "../dto/configuration.dto"

interface ConfigurationState {
    layout: Layout | null,
    ip: string | null,
    offline: boolean
}

const initialState: ConfigurationState = {
    layout: null,
    ip: null,
    offline: false
}

const configurationSlice = createSlice({
    name: "configuration",
    initialState,
    reducers: {
        updateLayout(state, action: PayloadAction<Layout>) {
            state.layout = action.payload
        },
        updateIp(state, action: PayloadAction<string>) {
            state.ip = action.payload;
        },
        updateOffline(state, action: PayloadAction<boolean>) {
            state.offline = action.payload
        }
    }
})

export const { updateLayout, updateIp, updateOffline } = configurationSlice.actions;
export default configurationSlice.reducer;
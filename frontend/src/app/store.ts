import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import co2Slice from './stores/co2-slice';
import configurationSlice from './stores/configuration-slice';
import electricityMeterSlice from './stores/electricity-meter-slice';
import electricityPriceSlice from './stores/electricity-price-slice';
import humiditySlice from './stores/humidity-slice';
import popupVisibilitySlice from './stores/popup-visibility-slice';
import temperatureSlice from './stores/temperature-slice';
import wattageSlice from './stores/wattage-slice';


export const store = configureStore({
  reducer: {
    popup: popupVisibilitySlice,
    configuration: configurationSlice,
    wattage: wattageSlice,
    electricityPrice: electricityPriceSlice,
    electricityMeter: electricityMeterSlice,
    temperature: temperatureSlice,
    humidity: humiditySlice,
    co2: co2Slice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

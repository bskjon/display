package no.iktdev.display.services

import no.iktdev.display.helper.ObservableList
import no.iktdev.display.helper.ObservableValue
import no.iktdev.display.model.*
import no.iktdev.display.model.homeassistant.Configuration
import no.iktdev.display.model.homeassistant.climate.Co2
import no.iktdev.display.model.homeassistant.climate.Humidity
import no.iktdev.display.model.homeassistant.climate.Temperature
import org.springframework.stereotype.Service


@Service
class ObserverService {

    val layout: ObservableList<Configuration.Layout> = ObservableList()
    val ip: ObservableValue<String> = ObservableValue()

    val temperature: ObservableList<Temperature> = ObservableList()
    val humidity: ObservableList<Humidity> = ObservableList()
    val co2: ObservableList<Co2> = ObservableList()

    val electricityPrice: ObservableList<ElectricityPrice> = ObservableList()
    val electricityPriceNow: ObservableList<ElectricityPriceNow> = ObservableList()
    val electricityMeterNow: ObservableList<ElectricityMeterNow> = ObservableList()
    val electricityMeter: ObservableList<ElectricityMeter> = ObservableList()
    val wattage: ObservableList<Wattage> = ObservableList()

}
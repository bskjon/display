package no.iktdev.display.rest

import no.iktdev.display.model.homeassistant.climate.Co2
import no.iktdev.display.model.homeassistant.climate.Humidity
import no.iktdev.display.model.homeassistant.climate.Temperature
import no.iktdev.display.modelss.*
import no.iktdev.display.services.ObserverService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping(path = ["/climate"])
class ClimateController(private val observerService: ObserverService) {


    @PostMapping("/temperature")
    fun onTemperature(@RequestBody payload: Temperature?) {

        if (payload?.value == null)
            return
        if (payload.unit.isEmpty()) {
            payload.unit = "°C"
        }
        observerService.temperature.set(payload)
    }

    @PostMapping("/humidity")
    fun onHumidity(@RequestBody payload: Humidity?) {

        if (payload?.value == null)
            return
        if (payload.unit.isEmpty()) {
            payload.unit = "%"
        }
        observerService.humidity.set(payload)
    }

    @PostMapping("/co2")
    fun onCO2(@RequestBody payload: Co2?) {

        if (payload?.value == null)
            return
        observerService.co2.set(payload)
    }
}
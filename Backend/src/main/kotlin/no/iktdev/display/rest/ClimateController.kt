package no.iktdev.display.rest

import no.iktdev.display.climate
import no.iktdev.display.model.*
import no.iktdev.display.model.rest.ClimateRestTemplate
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping(path = ["/climate"])
class ClimateController {

    fun updateWith(newValue: Climate) {
        val existing = climate.items.find { it.id == newValue.id }
        if (existing == null)
            climate.add(newValue)
        else
            climate.replace(existing, newValue)
    }

    @PostMapping("/temperature")
    fun onTemperature(@RequestBody payload: ClimateRestTemplate) {

        if (payload.value == null)
            return
        val newClimate = Climate(
            id = "${payload.id}-temperature",
            where = payload.where,
            value = payload.value,
            unit = payload.unit  ?: "°C",
            valueType = ClimateType.TEMPERATURE
        )
        updateWith(newClimate)
    }

    @PostMapping("/humidity")
    fun onHumidity(@RequestBody payload: ClimateRestTemplate) {

        if (payload.value == null)
            return
        val newClimate = Climate(
            id = "${payload.id}-humidity",
            where = payload.where,
            value = payload.value,
            unit = payload.unit  ?: "%",
            valueType = ClimateType.HUMIDITY
        )
        updateWith(newClimate)
    }

    @PostMapping("/co2")
    fun onCO2(@RequestBody payload: ClimateRestTemplate) {

        if (payload.value == null)
            return
        val newClimate = Climate(
            id = "${payload.id}-co2",
            where = payload.where,
            value = payload.value,
            unit = payload.unit  ?: "ppm",
            valueType = ClimateType.CARBON_DIOXIDE
        )
        updateWith(newClimate)
    }
}
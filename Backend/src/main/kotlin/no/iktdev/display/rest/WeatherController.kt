package no.iktdev.display.rest

import no.iktdev.display.climate
import no.iktdev.display.model.*
import no.iktdev.display.model.rest.WeatherRestTemplate
import no.iktdev.display.weather
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(path = ["/weather"])
class WeatherController {

    fun updateWith(newValue: Weather) {
        val existing = weather.items.find { it.id == newValue.id }
        if (existing == null)
            weather.add(newValue)
        else
            weather.replace(existing, newValue)
    }

    @PostMapping("/now")
    fun onWeather(@RequestBody payload: WeatherRestTemplate) {

        val newWeather = Weather(
            id = payload.id,
            current = upperFirst(payload.state),
            temperature = KV(payload.temperature, payload.temperature_unit ?: "°C"),
            precipitation =
                if (payload.precipitation != null) KV(payload.precipitation, payload.precipitation_unit ?: "mm") else null,
            wind = if (payload.wind != null) KV(payload.wind, payload.wind_unit ?: "km/h") else null
        )
        updateWith(newWeather)
    }

    private fun upperFirst(text: String): String {
        return if (text.isNotEmpty()) text.substring(0,1).uppercase() + text.substring(1) else text
    }
}
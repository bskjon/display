package no.iktdev.display.rest

import no.iktdev.display.getViewsFile
import no.iktdev.display.model.homeassistant.Configuration
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
@RequestMapping(path = ["/configuration"])
class ConfigurationController(private val observerService: ObserverService) {


    @PostMapping("/layout")
    fun onLayout(@RequestBody payload: Configuration.Layout?) {
        if (payload == null)
            return
        observerService.layout.set(payload)
        //val layoutFile = getViewsFile()

    }

}
package no.iktdev.display.ws

import no.iktdev.display.helper.ObservableList
import no.iktdev.display.model.homeassistant.climate.Co2
import no.iktdev.display.model.homeassistant.climate.Humidity
import no.iktdev.display.model.homeassistant.climate.Temperature
import no.iktdev.display.services.ObserverService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Controller

@Controller
class ClimateTopic(@Autowired private val template: SimpMessagingTemplate, observer: ObserverService) {

    private val temperatureListener = object : ObservableList.Listener<Temperature> {
        override fun onChanged(item: Temperature) {
            template.convertAndSend("/topic/temperature", item)
        }

        override fun onListChanged(items: List<Temperature>) {
            items.forEach { onChanged(it) }
        }
    }

    private val humidityListener = object : ObservableList.Listener<Humidity> {
        override fun onChanged(item: Humidity) {
            template.convertAndSend("/topic/humidity", item)
        }

        override fun onListChanged(items: List<Humidity>) {
            items.forEach { onChanged(it) }
        }
    }

    private val co2Listener = object : ObservableList.Listener<Co2> {
        override fun onChanged(item: Co2) {
            template.convertAndSend("/topic/co2", item)
        }

        override fun onListChanged(items: List<Co2>) {
            items.forEach { onChanged(it) }
        }
    }

    init {
        observer.temperature.addListener(temperatureListener)
        observer.humidity.addListener(humidityListener)
        observer.co2.addListener(co2Listener)
    }


}
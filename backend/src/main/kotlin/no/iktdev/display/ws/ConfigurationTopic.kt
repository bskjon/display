package no.iktdev.display.ws

import no.iktdev.display.helper.ObservableList
import no.iktdev.display.helper.ObservableValue
import no.iktdev.display.instance.Networking
import no.iktdev.display.model.homeassistant.Configuration
import no.iktdev.display.model.homeassistant.climate.Co2
import no.iktdev.display.model.homeassistant.climate.Humidity
import no.iktdev.display.model.homeassistant.climate.Temperature
import no.iktdev.display.services.ObserverService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Controller

@Controller
class ConfigurationTopic(
    @Autowired private val template: SimpMessagingTemplate,
    private val observer: ObserverService
) {

    private val layoutListener = object : ObservableList.Listener<Configuration.Layout> {
        override fun onChanged(item: Configuration.Layout) {
            template.convertAndSend("/topic/configuration/layout", item)
        }

        override fun onListChanged(items: List<Configuration.Layout>) {
            items.forEach { onChanged(it) }
        }
    }

    private val ipListener = object : ObservableValue.ValueListener<String> {
        override fun onUpdated(value: String) {
            template.convertAndSend("/topic/configuration/ip", value)
        }
    }

    init {
        observer.layout.addListener(layoutListener)
        observer.ip.addListener(ipListener)
    }


    @MessageMapping("/configuration/ip")
    fun handleIpRequest() {
        val ip = Networking().getNetworkCapable().firstOrNull()?.hostAddress
        if (ip == null) {
            template.convertAndSend("/topic/configuration/offline", true)
        } else {
            template.convertAndSend("/topic/configuration/offline", false)
            observer.ip.next(ip)

        }
    }


}
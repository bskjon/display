package no.iktdev.display.ws

import no.iktdev.display.climate
import no.iktdev.display.getContext
import no.iktdev.display.model.Climate
import no.iktdev.display.model.View
import no.iktdev.display.model.Weather
import no.iktdev.display.weather
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Controller

@Controller
class WeatherSocket @Autowired constructor(private val template: SimpMessagingTemplate) {
    companion object {
        fun get(): WeatherSocket? {
            return getContext()?.getBean(WeatherSocket::class.java)
        }
    }

    @SendTo("/push/weather")
    fun pushViews(items: List<Weather>) {
        println("Pushing weather")
        template.convertAndSend("/push/weather", items)
    }

    @MessageMapping("/fetch/weather")
    fun fetchViews() {
        pushViews(weather.items)
    }

    /*@SendTo("/push/views")
    fun pushView(item: View) {
        template.convertAndSend(listOf(item))
    }*/

    //@SendTo("/pop/view")

}
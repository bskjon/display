package no.iktdev.display.ws

import no.iktdev.display.climate
import no.iktdev.display.getContext
import no.iktdev.display.model.Climate
import no.iktdev.display.model.View
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Controller

@Controller
class ClimateSocket @Autowired constructor(private val template: SimpMessagingTemplate) {
    companion object {
        fun get(): ClimateSocket? {
            return getContext()?.getBean(ClimateSocket::class.java)
        }
    }

    @SendTo("/push/climate")
    fun pushViews(items: List<Climate>) {
        println("Pushing climate")
        template.convertAndSend("/push/climate", items)
    }

    @MessageMapping("/fetch/climate")
    fun fetchViews() {
        pushViews(climate.items)
    }

    /*@SendTo("/push/views")
    fun pushView(item: View) {
        template.convertAndSend(listOf(item))
    }*/

    //@SendTo("/pop/view")

}
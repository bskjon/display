package no.iktdev.display.ws

import no.iktdev.display.getContext
import no.iktdev.display.ip
import no.iktdev.display.model.View
import no.iktdev.display.views
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Controller

@Controller
class IpAddressSocket @Autowired constructor(private val template: SimpMessagingTemplate) {
    companion object {
        fun get(): IpAddressSocket? {
            return getContext()?.getBean(IpAddressSocket::class.java)
        }
    }

    @SendTo("/push/ip")
    fun pushViews(ip: String) {
        template.convertAndSend("/push/ip", ip)
    }

    @MessageMapping("/fetch/ip")
    fun fetchViews() {
        pushViews(ip)
    }

    /*@SendTo("/push/views")
    fun pushView(item: View) {
        template.convertAndSend(listOf(item))
    }*/

    //@SendTo("/pop/view")

}
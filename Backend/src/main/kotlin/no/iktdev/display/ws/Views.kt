package no.iktdev.display.ws

import no.iktdev.display.getContext
import no.iktdev.display.model.View
import no.iktdev.display.views
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Controller

@Controller
class Views @Autowired constructor(private val template: SimpMessagingTemplate) {
    companion object {
        fun get(): Views? {
            return getContext()?.getBean(Views::class.java)
        }
    }

    @SendTo("/push/views")
    fun pushViews(items: List<View>) {
        template.convertAndSend("/push/views", items)
    }

    @MessageMapping("/fetch/views")
    fun fetchViews() {
        pushViews(views.items)
    }

    /*@SendTo("/push/views")
    fun pushView(item: View) {
        template.convertAndSend(listOf(item))
    }*/

    //@SendTo("/pop/view")

}
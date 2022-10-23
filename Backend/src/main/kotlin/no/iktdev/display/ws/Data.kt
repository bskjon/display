package no.iktdev.display.ws

import no.iktdev.display.model.View
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Controller

@Controller
class Data @Autowired constructor(private val template: SimpMessagingTemplate) {

    @SendTo("/push/data")
    fun push(view: View) {
        template.convertAndSend(view)
    }


    //@SendTo("/pop/view")

}
package no.iktdev.display.ws

import no.iktdev.display.climate
import no.iktdev.display.getContext
import no.iktdev.display.model.Climate
import no.iktdev.display.model.LiveWatt
import no.iktdev.display.model.View
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Controller

@Controller
class MeterMeasurementSocket @Autowired constructor(private val template: SimpMessagingTemplate) {
    companion object {
        fun get(): MeterMeasurementSocket? {
            return getContext()?.getBean(MeterMeasurementSocket::class.java)
        }
    }

    @SendTo("/push/meter/live")
    fun pushLiveMeasurement(value: LiveWatt) {
        // println("Pushing live")
        template.convertAndSend("/push/meter/live", value)
    }


}
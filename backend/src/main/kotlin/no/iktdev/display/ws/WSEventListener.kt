package no.iktdev.display.ws

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Component
import org.springframework.web.socket.messaging.SessionConnectedEvent

@Component
class WSEventListener(
    @Autowired val config: ConfigurationTopic
) {

    @EventListener
    fun handleSessionConnected(event: SessionConnectedEvent) {
        val layout = config.observer.layout.items.lastOrNull()?.let { layout ->
            config.pushLayout(layout)
        }
    }
}
package no.iktdev.display

import org.springframework.context.annotation.Configuration
import org.springframework.messaging.simp.config.MessageBrokerRegistry
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.method.HandlerTypePredicate
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.socket.WebSocketHandler
import org.springframework.web.socket.config.annotation.*
import org.springframework.web.socket.handler.WebSocketHandlerDecoratorFactory
import java.time.Duration

class Configuration {
    companion object {
        val networkAddressForCheck: String? = System.getenv("WAN_ADDRESS") ?: "google.com"
        val platformWattMeterProvider: String? = System.getenv("METER_PLATFORM")
        val platformWattMeterToken: String? = System.getenv("METER_PLATFORM_TOKEN")
    }
}

@Configuration
class WebConfig: WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**")
            .allowedOrigins("*")
            .allowCredentials(false)
    }

    override fun configurePathMatch(configurer: PathMatchConfigurer) {
        configurer.addPathPrefix("/api", HandlerTypePredicate.forAnnotation(RestController::class.java))
    }

    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        registry.addResourceHandler("/**")
            .addResourceLocations("classpath:/static/")
    }
}


@Configuration
@EnableWebSocketMessageBroker
class WebSocketConfig : WebSocketMessageBrokerConfigurer {

    override fun registerStompEndpoints(registry: StompEndpointRegistry) {
        registry.addEndpoint("/ws")
            .setAllowedOrigins("http://localhost:3000")
            .withSockJS()
    }

    override fun configureMessageBroker(registry: MessageBrokerRegistry) {
        registry.enableSimpleBroker("/topic")
        registry.setApplicationDestinationPrefixes("/app")
    }
}
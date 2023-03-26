package no.iktdev.display

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

class Configuration {
    companion object {
        val networkAddressForCheck: String? = System.getenv("WAN_ADDRESS") ?: "google.com"
        val platformWattMeterProvider: String? = System.getenv("METER_PLATFORM")
        val platformWattMeterToken: String? = System.getenv("METER_PLATFORM_TOKEN")
    }

    @Configuration
    public class WebConfig: WebMvcConfigurer {
        override fun addCorsMappings(registry: CorsRegistry) {
            registry.addMapping("/**")
                .allowedOrigins("*")
                .allowCredentials(false)
        }
    }
}
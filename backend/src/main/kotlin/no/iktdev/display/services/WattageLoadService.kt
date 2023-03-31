package no.iktdev.display.services

import no.iktdev.display.Configuration
import no.iktdev.display.helper.Logger
import no.iktdev.display.getContext
import no.iktdev.display.helper.ObservableValue
import no.iktdev.display.model.Wattage
import no.iktdev.display.modelss.*
import no.iktdev.display.providers.ServiceProvider
import no.iktdev.display.providers.TibberServiceProvider
import org.springframework.stereotype.Service
import javax.annotation.PreDestroy

@Service
class WattageLoadService(observerService: ObserverService) {
    companion object {
        fun get(): WattageLoadService? {
            return getContext()?.getBean(WattageLoadService::class.java)
        }
    }
    final var platform: ServiceProvider? = null

    init {
        platform = when (Configuration.platformWattMeterProvider) {
            "TIBBER" -> TibberServiceProvider()
            else -> null
        }
        platform?.wattConsumption?.addListener(object : ObservableValue.ValueListener<Wattage?> {
            override fun onUpdated(value: Wattage?) {
                if (value?.wattage != null) {
                    observerService.wattage.set(value)
                } else {
                    Logger.info(this, "Platform Watt Consumption is null")
                }
            }
        })
        platform?.start()
    }


    @PreDestroy
    fun close() {
        this.platform?.stop()
    }
}
package no.iktdev.display

import no.iktdev.display.helper.ObservableValue
import no.iktdev.display.model.*
import no.iktdev.display.providers.ServiceProvider
import no.iktdev.display.providers.TibberServiceProvider
import org.springframework.stereotype.Service
import javax.annotation.PreDestroy

@Service
class WattageLoadService {
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
        platform?.wattConsumption?.addListener(object : ObservableValue.ValueListener<LiveWatt?> {
            override fun onUpdated(value: LiveWatt?) {
                if (value?.power != null) {
                    if (views.items.find { it.type == ViewType.ELECTRICITY_METER } == null) {
                        views.add(getView(value.id))
                    }
                } else {
                    Logger.info(this, "Platform Watt Consumption is null")
                }
            }
        })
        platform?.start()
    }


    private fun getView(id: String): View {
        val view = View(
            viewId = id,
            type = ViewType.ELECTRICITY_METER,
            views = listOf()
        )
        return view
    }

    @PreDestroy
    fun close() {
        this.platform?.stop()
    }
}
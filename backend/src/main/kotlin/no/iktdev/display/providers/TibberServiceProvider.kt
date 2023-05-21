package no.iktdev.display.providers

import kotlinx.coroutines.launch
import no.iktdev.display.Configuration
import no.iktdev.display.helper.Logger
import no.iktdev.display.model.Wattage
import no.iktdev.kibber.Tibber
import no.iktdev.kibber.TibberListener
import no.iktdev.tibber.TibberPulseSubscription

class TibberServiceProvider: ServiceProvider() {
    lateinit var tibber: Tibber

    init {
        val token = Configuration.platformWattMeterToken
        if (token.isNullOrEmpty())
            throw RuntimeException("Platform Watt Meter Token is null or empty")
        Logger.info(this::class.java, "Constructing Tibber ServiceProvider")
        tibber = Tibber(token, "display")

        tibber.registeredLiveListener = object : TibberListener {
            override fun onInvalidMeasurementReceived() {
                Logger.error(this::class.java, "Received INVALID measurement")
            }

            override fun onMeasurementReceived(measurement: TibberPulseSubscription.LiveMeasurement) {
                Logger.info(this@TibberServiceProvider::class.java, "Received measurement")
                wattConsumption.next(
                    Wattage(id = "TIBBER", timestamp = measurement.timestamp, wattage = measurement.power)
                )
            }

            override fun onMeasurementRetry(attempt: Long, throwable: Throwable?) {
                super.onMeasurementRetry(attempt, throwable)
                Logger.error(this::class.java, "Retry $attempt")
            }

        }
    }

    override var start: () -> Unit = {
        scope.launch {
            val home = tibber.homesWithLiveReader().firstOrNull() ?: throw RuntimeException("No homes with live wattage found")
            tibber.readLiveWattage(home.id)
        }
    }

    override var stop: () -> Unit = {
        tibber.close()
    }

}
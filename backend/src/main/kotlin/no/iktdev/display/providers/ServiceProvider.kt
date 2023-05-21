package no.iktdev.display.providers

import kotlinx.coroutines.CoroutineScope
import no.iktdev.display.Coroutines
import no.iktdev.display.helper.ObservableValue
import no.iktdev.display.model.Wattage


abstract class ServiceProvider {
    val scope: CoroutineScope = Coroutines().Coroutine()
    val wattConsumption: ObservableValue<Wattage?> = ObservableValue()

    protected abstract var start: () -> Unit

    protected abstract var stop: () -> Unit

    fun start() {
        start.invoke()
    }

    fun stop() {
        stop.invoke()
    }

}
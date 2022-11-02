package no.iktdev.display.providers

import io.reactivex.Observable
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import no.iktdev.display.helper.ObservableValue
import no.iktdev.display.model.LiveWatt


abstract class ServiceProvider {
    val scope: CoroutineScope = CoroutineScope(Job() + Dispatchers.Default)
    val wattConsumption: ObservableValue<LiveWatt?> = ObservableValue()

    init {
        start()
    }
    abstract fun start(): Unit

    abstract fun close()

}
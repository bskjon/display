package no.iktdev.display.ws

import no.iktdev.display.helper.ObservableList
import no.iktdev.display.model.*
import no.iktdev.display.services.ObserverService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Controller

@Controller
class ElectricityTopic(
    @Autowired private val template: SimpMessagingTemplate?,
    private val observer: ObserverService
) {

    private val liveWattListener = object : ObservableList.Listener<Wattage> {
        override fun onChanged(item: Wattage) {
            template?.convertAndSend("/topic/electricity/consumption/live")
        }

        override fun onListChanged(items: List<Wattage>) {
        }
    }

    private val priceListener = object : ObservableList.Listener<ElectricityPrice> {
        override fun onChanged(item: ElectricityPrice) {
            template?.convertAndSend("/topic/electricity/price", item)
        }

        override fun onListChanged(items: List<ElectricityPrice>) {
            items.forEach { onChanged(it) }
        }
    }

    private val usageListener = object : ObservableList.Listener<ElectricityMeter> {
        override fun onChanged(item: ElectricityMeter) {
            template?.convertAndSend("/topic/electricity/meter", item)
        }

        override fun onListChanged(items: List<ElectricityMeter>) {
            items.forEach { onChanged(it) }
        }
    }

    private val priceListenerNow = object : ObservableList.Listener<ElectricityPriceNow> {
        override fun onChanged(item: ElectricityPriceNow) {
            template?.convertAndSend("/topic/electricity/price/now", item)
        }

        override fun onListChanged(items: List<ElectricityPriceNow>) {
            items.forEach { onChanged(it) }
        }
    }

    private val usageListenerNow = object : ObservableList.Listener<ElectricityMeterNow> {
        override fun onChanged(item: ElectricityMeterNow) {
            template?.convertAndSend("/topic/electricity/meter/now", item)
        }

        override fun onListChanged(items: List<ElectricityMeterNow>) {
            items.forEach { onChanged(it) }
        }
    }

    init {
        observer.electricityPrice.addListener(priceListener)
        observer.electricityMeter.addListener(usageListener)
        observer.wattage.addListener(liveWattListener)
        observer.electricityPriceNow.addListener(priceListenerNow)
        observer.electricityMeterNow.addListener(usageListenerNow)
    }

}
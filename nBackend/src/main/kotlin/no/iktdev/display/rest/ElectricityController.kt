package no.iktdev.display.rest

import no.iktdev.display.helper.Time
import no.iktdev.display.model.*
import no.iktdev.display.model.homeassistant.electricity.ElectricityMeter
import no.iktdev.display.model.homeassistant.electricity.ElectricityPrices
import no.iktdev.display.services.ObserverService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDateTime
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter

@RestController
@RequestMapping(path = ["/electricity"])
class ElectricityController(private val observerService: ObserverService) {

    val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")

    @PostMapping("/price")
    fun elprice(@RequestBody payload: ElectricityPrices? = null) {
        if (payload == null)
            return
        val tomorrowStart = Time.unzoned(payload.price_start).apply {
            plusDays(1)
        }

        val pricing = ElectricityPrice(
            id = "${payload.id}",
            title = payload.title,
            unit = payload.unit_of_measurement,
            start = (Time.unzoned(payload.price_start).toEpochSecond(ZoneOffset.UTC)*1000).toString(),
            end = (Time.unzoned(payload.price_end).toEpochSecond(ZoneOffset.UTC)*1000).toString(),
            today = transformToHourly(payload.price_start, payload.price_today),
            tomorrow = transformToHourly(tomorrowStart.format(formatter), payload.price_tomorrow)

        )
        observerService.electricityPrice.set(pricing)


        val now = ElectricityPriceNow(
            id = "${payload.id}",
            title = payload.title,
            unit = payload.unit_of_measurement,
            current = payload.price_now,
            level = payload.price_level ?: "UNKNOWN"
        )
        observerService.electricityPriceNow.set(now)

    }


    @PostMapping("/usage")
    fun elusage(@RequestBody payload: ElectricityMeter?) {

        if (payload == null) {
            return
        }

        val meterUsage = ElectricityMeter(
            id = payload.id,
            title = payload.title,
            start = (Time.unzoned(payload.start).toEpochSecond(ZoneOffset.UTC)*1000).toString(),
            end = (Time.unzoned(payload.end).toEpochSecond(ZoneOffset.UTC)*1000).toString(),
            unit = payload.unit_of_measurement,
            hourly = transformToHourly(payload.start, payload.hourly_consumption)
        )

        observerService.electricityMeter.set(meterUsage)

        val now = ElectricityMeterNow(
            id = "${payload.id}",
            title = payload.title,
            unit = payload.unit_of_measurement,
            current = payload.now_consumption
        )
        observerService.electricityMeterNow.set(now)
    }


    private fun unzoned(start: String): LocalDateTime {
        val unzoned = if (start.contains("+")) start.substring(0, start.indexOf("+")) else start
        return LocalDateTime.parse(unzoned)
    }


    private fun transformToHourly(start: String, values: List<Float>): List<DatedNumberValue> {
        val transformed: MutableList<DatedNumberValue> = mutableListOf()
        var time = unzoned(start)

        for (value in values) {
            transformed.add(DatedNumberValue(at=time.toEpochSecond(ZoneOffset.UTC)*1000, value=value))
            time = time.plusHours(1)
        }
        return transformed
    }
}
package no.iktdev.display.rest

import com.google.gson.Gson
import no.iktdev.display.model.*
import no.iktdev.display.model.rest.Electricity_Consumption
import no.iktdev.display.model.rest.Electricity_Price
import no.iktdev.display.views
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDateTime
import java.time.ZoneOffset

@RestController
@RequestMapping(path = ["/electricity"])
class ElectricityController {

    @PostMapping("/price")
    fun elprice(@RequestBody payload: Electricity_Price) {
        val id_elPriceNow = "${payload.id}-now"
        val id_elPriceToday = "${payload.id}-today"

        val id_elPriceMin = "${payload.id}-min"
        val id_elPriceAvg = "${payload.id}-avg"
        val id_elPriceMax = "${payload.id}-max"

        val newItemViews = mutableListOf<ViewItem>(
            ViewItemSingleDatedNumberUnitBased(
                viewItemId = id_elPriceNow,
                viewType = Views.ELECTRICITY_PRICE,
                title = payload.title ?: id_elPriceNow,
                value = DatedNumberValue(
                    at = unzoned(payload.start).toEpochSecond(ZoneOffset.UTC)*1000,
                    value = payload.price_now
                ),
                unitOfMeasurement = payload.unit_of_measurement
            ),
            ViewItemGraphElectricityBased(
                viewItemId = id_elPriceToday,
                viewType = Views.GRAPH_ELECTRICITY_PRICE,
                title = payload.title ?: id_elPriceToday,
                value = transformToHourly(payload.price_start, payload.price_today),
                unitOfMeasurement = payload.unit_of_measurement
            )
        )

        if (payload.price_min != null && payload.price_avg != null && payload.price_max != null) {
            newItemViews.addAll(
                listOf(
                    ViewItemSingleNumberAndUnitBased(
                        viewItemId = id_elPriceMin,
                        viewType = Views.ELECTRICITY_PRICE_MIN,
                        title = payload.title ?: id_elPriceMin,
                        value = payload.price_min ?: 0F,
                        unitOfMeasurement = payload.unit_of_measurement
                    ),
                    ViewItemSingleNumberAndUnitBased(
                        viewItemId = id_elPriceAvg,
                        viewType = Views.ELECTRICITY_PRICE_AVG,
                        title = payload.title ?: id_elPriceAvg,
                        value = payload.price_avg ?: 0F,
                        unitOfMeasurement = payload.unit_of_measurement
                    ),
                    ViewItemSingleNumberAndUnitBased(
                        viewItemId = id_elPriceMax,
                        viewType = Views.ELECTRICITY_PRICE_MAX,
                        title = payload.title ?: id_elPriceMax,
                        value = payload.price_max ?: 0F,
                        unitOfMeasurement = payload.unit_of_measurement
                    )
                )
            )
        }


        val existing = views.items.find { it.viewId == payload.group }
        val existingViewItems = existing?.views?.filter { !listOf(Views.ELECTRICITY_PRICE, Views.GRAPH_ELECTRICITY_PRICE).contains(it.viewType)  }
            ?: listOf()
        newItemViews.addAll(existingViewItems)


        val view = View(
            viewId = payload.group,
            type = ViewType.ELECTRICITY,
            views = newItemViews
        )

        if (existing == null)
            views.add(view)
        else
            views.replace(existing, view)

    }
    @PostMapping("/usage")
    fun elusage(@RequestBody payload: Electricity_Consumption) {
        val id_elConsumptionToday = "${payload.id}-today"

        val newItemViews = mutableListOf<ViewItem>(
            ViewItemGraphElectricityBased(
                viewItemId = id_elConsumptionToday,
                viewType = Views.GRAPH_ELECTRICITY_CONSUMPTION,
                title = payload.title ?: id_elConsumptionToday,
                value = transformToHourly(payload.start, payload.hourly_consumption),
                unitOfMeasurement = payload.unit_of_measurement
            )
        )
        val existing = views.items.find { it.viewId == payload.group }
        val existingViewItems = existing?.views?.filter { !listOf(Views.GRAPH_ELECTRICITY_CONSUMPTION).contains(it.viewType)  }
            ?: listOf()
        newItemViews.addAll(existingViewItems)

        val view = View(
            viewId = payload.group,
            type = ViewType.ELECTRICITY,
            views = newItemViews
        )

        if (existing == null)
            views.add(view)
        else
            views.replace(existing, view)
    }


    private fun unzoned(start: String): LocalDateTime {
        val unzoned = start.substring(0, start.indexOf("+"))
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
package no.iktdev.display.model.homeassistant.electricity

import no.iktdev.display.model.homeassistant.ElectricityBase


data class ElectricityPrices(
    override val id: String,
    override val title: String?,
    val price_now: Float,
    val price_level: String?,
    val price_min: Float?,
    val price_avg: Float?,
    val price_max: Float?,
    override val unit_of_measurement: String,
    override val start: String,
    override val end: String,
    val price_today: List<Float>,
    val price_tomorrow: List<Float> = emptyList(),
    val price_start: String,
    val price_end: String
): ElectricityBase(id, title, start, end, unit_of_measurement)
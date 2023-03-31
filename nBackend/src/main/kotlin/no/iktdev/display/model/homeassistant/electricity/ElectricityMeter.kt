package no.iktdev.display.model.homeassistant.electricity

import no.iktdev.display.model.homeassistant.ElectricityBase

data class ElectricityMeter(
    override val id: String,
    override val title: String?,
    val group: String,
    override val unit_of_measurement: String,
    override val start: String,
    override val end: String,
    val now_consumption: Float,
    val hourly_consumption: List<Float> = listOf()
): ElectricityBase(id, title, start, end, unit_of_measurement)
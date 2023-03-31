package no.iktdev.display.model

import no.iktdev.display.model.homeassistant.ElectricityBase

data class ElectricityMeter(
    override val id: String,
    override val title: String?,
    override val start: String,
    override val end: String,
    val unit: String,
    val hourly: List<DatedNumberValue> = emptyList()
): ElectricityBase(id, title, start, end, unit)

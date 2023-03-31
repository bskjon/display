package no.iktdev.display.model

import no.iktdev.display.model.DatedNumberValue
import no.iktdev.display.model.homeassistant.ElectricityBase

data class ElectricityPrice(
    override val id: String,
    override val title: String?,
    val unit: String,
    override val start: String,
    override val end: String,
    val today: List<DatedNumberValue>,
    val tomorrow: List<DatedNumberValue>,
): ElectricityBase(id, title, start, end, unit)

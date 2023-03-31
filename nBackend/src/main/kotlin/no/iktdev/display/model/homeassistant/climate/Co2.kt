package no.iktdev.display.model.homeassistant.climate

import no.iktdev.display.model.homeassistant.ClimateBase

data class Co2(
    override val id: String,
    override val value: String,
    override val where: String,
    override var unit: String = "ppm"
): ClimateBase(id = id, value = value, where = where, unit = unit)

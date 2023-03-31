package no.iktdev.display.model

import no.iktdev.display.helper.IObservable
import no.iktdev.display.model.homeassistant.ElectricityBase

data class ElectricityPriceNow(
    override val id: String,
    val title: String?,
    val unit: String,
    val current: Float,
    val level: String
): IObservable()

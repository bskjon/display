package no.iktdev.display.model

import no.iktdev.display.helper.IObservable

data class ElectricityMeterNow(
    override val id: String,
    val title: String?,
    val unit: String,
    val current: Float,
): IObservable()

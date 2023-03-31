package no.iktdev.display.model

import no.iktdev.display.helper.IObservable

data class Wattage(
    override val id: String,
    val wattage: Double = 0.0,
    val timestamp: String
): IObservable()

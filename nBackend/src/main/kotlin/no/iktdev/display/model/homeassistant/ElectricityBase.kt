package no.iktdev.display.model.homeassistant

import no.iktdev.display.helper.IObservable

abstract class ElectricityBase(
    @Transient override val id: String,
    @Transient open val title: String?,
    @Transient open val start: String,
    @Transient open val end: String,
    @Transient open val unit_of_measurement: String
): IObservable()
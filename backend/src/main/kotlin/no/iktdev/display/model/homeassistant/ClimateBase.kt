package no.iktdev.display.model.homeassistant

import no.iktdev.display.helper.IObservable

abstract class ClimateBase(
    @Transient override val id: String,
    @Transient open val where: String,
    @Transient open val value: String,
    @Transient open val unit: String
): IObservable()
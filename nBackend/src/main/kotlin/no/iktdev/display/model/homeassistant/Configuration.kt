package no.iktdev.display.model.homeassistant

import no.iktdev.display.helper.IObservable
import java.util.UUID

class Configuration {

    data class LayoutColumn(
        val view: String?,
        val weight: Int
    )

    data class LayoutRow(
        val columnCounts: Int,
        val columns: List<LayoutColumn>,
        val weight: Int
    )

    data class Layout(
        override val id: String = UUID.randomUUID().toString(),
        val rowCounts: Int,
        val rows: List<LayoutRow>
    ): IObservable()

}
package no.iktdev.display.modelss

import java.util.*

data class View(val viewId: String = UUID.randomUUID().toString(), val type: ViewType, val views: List<ViewItem>)
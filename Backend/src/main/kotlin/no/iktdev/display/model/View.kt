package no.iktdev.display.model

import java.util.*

data class View(val viewId: String = UUID.randomUUID().toString(), val type: ViewType, val views: List<ViewItem>)
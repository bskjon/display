package no.iktdev.display.model.rest

data class ClimateRestTemplate (
    val id: String,
    val where: String,
    val value: Float? = null,
    val unit: String? = null
)
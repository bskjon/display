package no.iktdev.display.model

data class LiveWatt(
    val id: String,
    val timestamp: String?,
    val power: Double?,
)
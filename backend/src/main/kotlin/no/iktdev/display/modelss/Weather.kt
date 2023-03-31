package no.iktdev.display.modelss

data class Weather (
    val id: String,
    val current: String,
    val temperature: KV? = null,
    val precipitation: KV? = null,
    val wind: KV? = null,
    val type: Views = Views.WEATHER
)

data class KV(
    val value: Float,
    val unit: String
)

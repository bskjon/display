package no.iktdev.display.model.rest

data class WeatherRestTemplate(
    val id: String,
    val state: String, // Sunny, Cloudy etc
    val temperature: Float,
    val temperature_unit: String,
    val precipitation: Float? = null,
    val precipitation_unit: String? = null,
    val wind: Float? = null,
    val wind_unit: String? = null
)
package no.iktdev.display.model.rest

abstract class Electricity(
    @Transient open val id: String,
    @Transient open val title: String?,
    @Transient open val group: String,
    @Transient open val start: String,
    @Transient open val end: String,
    @Transient open val unit_of_measurement: String
    )

data class Electricity_Price(
    override val id: String,
    override val title: String?,
    override val group: String,
    val price_now: Float,
    val price_level: String?,
    val price_min: Float?,
    val price_avg: Float?,
    val price_max: Float?,
    override val unit_of_measurement: String,
    override val start: String,
    override val end: String,
    val price_today: List<Float>,
    val price_tomorrow: List<Float>?,
    val price_start: String,
    val price_end: String
    ): Electricity(id, title, group, start, end, unit_of_measurement)

data class Electricity_Consumption(
    override val id: String,
    override val title: String?,
    override val group: String,
    override val unit_of_measurement: String,
    override val start: String,
    override val end: String,
    val now_consumption: Float,
    val hourly_consumption: List<Float> = listOf()
): Electricity(id, title, group, start, end, unit_of_measurement)
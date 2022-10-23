package no.iktdev.display.model

class Climate(
    val id: String,
    val where: String,
    val value: Float,
    val unit: String,
    val valueType: ClimateType,
    val type: Views = Views.CLIMATE,
)

enum class ClimateType {
    TEMPERATURE    ,
    CARBON_DIOXIDE ,
    HUMIDITY       ,
}


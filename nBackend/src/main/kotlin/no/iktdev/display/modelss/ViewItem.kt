package no.iktdev.display.modelss

import java.util.*

abstract class ViewItem(
    @Transient open val viewItemId: String = UUID.randomUUID().toString(),
    @Transient open val viewType: Views,
    @Transient open val title: String,
    @Transient open val value: Any)

abstract class ViewItemUnit(
    @Transient override val viewItemId: String = UUID.randomUUID().toString(),
    @Transient override val viewType: Views,
    @Transient override val title: String,
    @Transient open val unitOfMeasurement: String?,
    @Transient override val value: Any): ViewItem(viewItemId, viewType, title, value)

data class ViewItemSingleValueBased(
    override val viewItemId: String = UUID.randomUUID().toString(),
    override val viewType: Views,
    override val title: String,
    override val value: String,
): ViewItem(viewItemId = viewItemId, viewType = viewType, title = title, value = value)

data class ViewItemGraphElectricityBased(
    override val viewItemId: String = UUID.randomUUID().toString(),
    override val viewType: Views,
    override val title: String,
    override val value: List<DatedNumberValue>,
    override val unitOfMeasurement: String,
): ViewItemUnit(viewItemId = viewItemId, viewType = viewType, title = title, value = value, unitOfMeasurement = unitOfMeasurement)

data class ViewItemSingleNumberAndUnitBased(
    override val viewItemId: String = UUID.randomUUID().toString(),
    override val viewType: Views,
    override val title: String,
    override val value: Float,
    override val unitOfMeasurement: String
): ViewItemUnit(viewItemId = viewItemId, viewType = viewType, title = title, value = value, unitOfMeasurement = unitOfMeasurement)


data class ViewItemSingleDatedNumberUnitBased(
    override val viewItemId: String = UUID.randomUUID().toString(),
    override val viewType: Views,
    override val title: String,
    override val value: DatedNumberValue,
    override val unitOfMeasurement: String
): ViewItemUnit(viewItemId = viewItemId, viewType = viewType, title = title, value = value, unitOfMeasurement = unitOfMeasurement)
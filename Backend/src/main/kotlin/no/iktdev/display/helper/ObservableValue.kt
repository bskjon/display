package no.iktdev.display.helper

class ObservableValue<T>(val initialValue: T? = null) {
    var value: T? = null
        private set

    fun next(value: T) {
        this.value = value
        listeners.forEach { it.onUpdated(value) }
    }

    private val listeners: MutableList<ValueListener<T>> = mutableListOf()
    fun addListener(listener: ValueListener<T>) {
        this.listeners.add(listener)
    }
    fun removeListener(listener: ValueListener<T>) {
        this.listeners.remove(listener)
    }

    interface ValueListener<T> {
        fun onUpdated(value: T)
    }
}
package no.iktdev.display.helper

class ObservableList<T>(private val initalItems: List<T> = emptyList()) {
    var items: MutableList<T> = mutableListOf()
        private set
    var listeners: MutableList<Listener<T>> = mutableListOf()
        private set

    init {
        if (initalItems.isNotEmpty()) {
            items.addAll(initalItems)
            listeners.forEach { it.onListChanged(items) }
        }
    }

    fun add(item: T) {
        items.add(item)
        listeners.forEach { it.onAdded(item) }
    }

    fun addAll(items: List<T>) {
        this.items.addAll(items)
        listeners.forEach { it.onListChanged(items) }
    }

    fun replace(item: T, with: T) {
        items.remove(item)
        items.add(with)
        listeners.forEach { it.onUpdated(with) }
    }

    fun remove(item: T) {
        this.items.remove(item)
        listeners.forEach { it.onRemoved(item) }
    }

    fun addListener(listener: Listener<T>) {
        this.listeners.add(listener)
    }
    fun removeListener(listener: Listener<T>) {
        if (listeners.contains(listener))
            listeners.remove(listener)
        else
            println("Cant remove something that is not added")
    }



    interface Listener<T> {
        fun onAdded(item: T)
        fun onRemoved(item: T)
        fun onUpdated(item: T)
        fun onListChanged(items: List<T>)
        //fun onUpdated(item: T)
    }
}
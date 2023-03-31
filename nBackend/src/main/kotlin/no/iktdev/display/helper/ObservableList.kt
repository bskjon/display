package no.iktdev.display.helper

import no.iktdev.display.model.homeassistant.climate.Co2
import no.iktdev.display.model.homeassistant.climate.Temperature


abstract class IObservable {
    abstract val id: String
}


class ObservableList<T: IObservable>(private val initalItems: List<T> = emptyList(), private val listener: Listener<T>? = null) {
    var items: MutableList<T> = mutableListOf()
        private set
    var listeners: MutableList<Listener<T>> = mutableListOf()
        private set

    init {
        listener?.let { listeners.add(it) }
        if (initalItems.isNotEmpty()) {
            items.addAll(initalItems)
            listeners.forEach { it.onListChanged(items) }
        }
    }

    fun set(item: T) {
        items.find { it.id == item.id }?.let {
            items.remove(it)
        }
        items.add(item)
        listeners.forEach { it.onChanged(item) }
    }

    fun addAll(items: List<T>) {
        this.items.addAll(items)
        listeners.forEach { it.onListChanged(items) }
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
        fun onChanged(item: T)
        fun onListChanged(items: List<T>)
    }
}
package no.iktdev.display.helper

import org.slf4j.LoggerFactory

class Logger {
    companion object {
        fun info(classObject: Any, message: String) {
            LoggerFactory.getLogger(classObject::class.java).info(message)
        }
        fun debug(classObject: Any, message: String) {
            LoggerFactory.getLogger(classObject::class.java).debug(message)
        }
        fun error(classObject: Any, message: String) {
            LoggerFactory.getLogger(classObject::class.java).error(message)
        }
        fun warn(classObject: Any, message: String) {
            LoggerFactory.getLogger(classObject::class.java).warn(message)
        }
    }
}
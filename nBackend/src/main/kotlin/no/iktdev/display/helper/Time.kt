package no.iktdev.display.helper

import java.time.LocalDateTime

class Time {
    companion object {
        fun unzoned(start: String?): LocalDateTime {
            if (start.isNullOrEmpty())
                throw IllegalArgumentException("Can't parse null value")
            val unzoned = start.substring(0, start.indexOf("+"))
            return LocalDateTime.parse(unzoned)
        }
    }
}
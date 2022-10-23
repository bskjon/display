package no.iktdev.display.rest

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import java.time.OffsetDateTime

internal class ElectricityTest {

    @Test
    fun parsing() {
        val time = "2022-10-18T23:00:00+02:00".substring(0, )
        assertDoesNotThrow {
            val paresed = OffsetDateTime.parse(time)

            assertNotNull(paresed)
        }
    }
}
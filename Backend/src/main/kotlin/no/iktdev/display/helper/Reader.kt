package no.iktdev.display.helper

import org.slf4j.LoggerFactory
import java.io.File

class Reader {
    fun read(file: File): String? {
        try {
            val instr = file.inputStream()
            return instr.bufferedReader().use { it.readText() }
        }
        catch (e: Exception) {
            LoggerFactory.getLogger(javaClass.simpleName).error("Failed to read preference file: ${file.absolutePath}.. Will use default configuration")
        }
        return null
    }
}
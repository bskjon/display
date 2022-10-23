package no.iktdev.display.helper

import org.slf4j.LoggerFactory
import java.io.File
import java.io.FileWriter
import java.io.PrintWriter
import java.nio.charset.Charset

class Writer {
    fun write(file: File, data: String): Boolean {
        try {
            PrintWriter(FileWriter(file.absolutePath))
                .use { it.write(data) }
        }
        catch (e: Exception) {
            LoggerFactory.getLogger(javaClass.simpleName).error("Failed to read preference file: ${file.absolutePath}.. Will use default configuration")
            return false
        }
        return true
    }
}
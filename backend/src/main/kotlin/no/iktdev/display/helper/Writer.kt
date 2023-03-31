package no.iktdev.display.helper

import com.google.gson.Gson
import org.slf4j.LoggerFactory
import java.io.File
import java.io.FileOutputStream
import java.io.FileWriter
import java.io.PrintWriter
import java.nio.charset.Charset

class Writer {

    private fun Write(file: File, data: ByteArray) {
        file.setWritable(true)
        val fos = FileOutputStream(file)
        fos.write(data)
        fos.close()
    }

    private fun Write(file: File, data: String) {
        val byteArray = data.toByteArray(Charsets.UTF_8)
        Write(file, byteArray)
    }

    fun append(file: File, data: String) {
        if (!file.exists()) {
            Write(file, data)
            file.appendText(System.getProperty("line.separator"))
        } else {
            file.appendText(data)
        }

    }

    fun write(file: File, data: Any): Boolean {

        try {
            when (data) {
                is ByteArray -> {
                    Write(file, data)
                }
                is String -> {
                    val byted = data.toByteArray(Charsets.UTF_8)
                    Write(file, byted)
                }
                else -> {
                    val enc = Gson().toJson(data)
                    Write(file, enc)
                }
            }
        }
        catch (e: Exception) {
            e.printStackTrace()
            return false
        }
        return true
    }
}
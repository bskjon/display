package no.iktdev.display.helper

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import org.slf4j.LoggerFactory
import java.io.BufferedReader
import java.io.File
import java.io.FileInputStream
import java.io.InputStreamReader
import java.lang.reflect.Type

class Reader {

    private fun Read(file: File): String?
    {
        if (!file.isFile) {
            return null
        }

        val inputStream = FileInputStream(file)
        val reader = BufferedReader(InputStreamReader(inputStream));
        val builder: StringBuilder = StringBuilder();

        var line: String?
        while (reader.readLine().also { line = it } != null)
        {
            builder.appendLine(line)
        }
        inputStream.close()
        reader.close()
        return builder.toString().filter { it.isISOControl() }
    }

    inline fun <reified T> fromJson(json: String, type: Type): T?
    {
        try {
            return Gson().fromJson(json, type)
        }
        catch (e: Exception) {
            e.printStackTrace()
        }
        return null;
    }

    inline fun <reified T> readWith(file: File) : T? {
        val typeToken = object: TypeToken<T>() {}.type
        val data = read(file) ?: return null
        return fromJson(data, typeToken)
    }

    fun read(file: File): String? {
        if (!file.exists())
            return null
        return Read(file)
    }

}
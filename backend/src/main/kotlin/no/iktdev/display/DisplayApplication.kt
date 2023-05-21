package no.iktdev.display

import no.iktdev.display.helper.FilePath
import no.iktdev.display.helper.ObservableValue
import no.iktdev.display.helper.Reader
import no.iktdev.display.instance.Networking
import no.iktdev.display.modelss.View
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.ApplicationContext
import java.io.File
import java.nio.file.Paths

@SpringBootApplication
class DisplayApplication

private var context: ApplicationContext? = null
fun getContext(): ApplicationContext? {
	return context
}

fun getViewsFile(): File {
	val userHome = Paths.get(System.getProperty("user.home"))
	return FilePath.Builder(userHome.toFile()).to("views.json").build()
}

var ip: String = "Unavailable"

fun main(args: Array<String>) {
	Coroutines.addListener(object : ObservableValue.ValueListener<Throwable> {
		override fun onUpdated(value: Throwable) {
			value.printStackTrace()
		}

	})
	val storedViewFile = getViewsFile()
	if (storedViewFile.exists()) {
		try {
			val read = Reader().readWith<List<View>>(storedViewFile)
			if (read != null) {

			}
		} catch (e: Exception) {
			e.printStackTrace()
		}
	}
	ip = Networking().getNetworkCapable().firstOrNull()?.hostAddress ?: "Offline"
	print(ip)
	context = runApplication<DisplayApplication>(*args)
}
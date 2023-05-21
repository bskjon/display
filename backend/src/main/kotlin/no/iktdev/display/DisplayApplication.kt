package no.iktdev.display

import com.google.gson.Gson
import no.iktdev.display.helper.*
import no.iktdev.display.helper.ObservableList.Listener
import no.iktdev.display.instance.Networking

import no.iktdev.display.modelss.View
import no.iktdev.display.rest.ConfigurationController
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.actuate.health.Health
import org.springframework.boot.actuate.health.HealthIndicator

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.ApplicationContext
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.messaging.simp.config.MessageBrokerRegistry
import org.springframework.stereotype.Component
import org.springframework.web.client.RestTemplate
import org.springframework.web.socket.client.WebSocketClient
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker
import org.springframework.web.socket.config.annotation.StompEndpointRegistry
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer
import java.io.File
import java.nio.file.Paths
import javax.annotation.PostConstruct

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
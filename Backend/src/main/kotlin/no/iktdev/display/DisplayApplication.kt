package no.iktdev.display

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import no.iktdev.display.helper.FilePath
import no.iktdev.display.helper.ObservableList
import no.iktdev.display.helper.ObservableList.Listener
import no.iktdev.display.helper.Reader
import no.iktdev.display.helper.Writer
import no.iktdev.display.instance.Networking
import no.iktdev.display.model.Climate
import no.iktdev.display.model.View
import no.iktdev.display.model.Weather
import no.iktdev.display.ws.ClimateSocket
import no.iktdev.display.ws.Views
import no.iktdev.display.ws.WeatherSocket
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.ApplicationContext
import org.springframework.context.annotation.Configuration
import org.springframework.messaging.simp.config.MessageBrokerRegistry
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker
import org.springframework.web.socket.config.annotation.StompEndpointRegistry
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer
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

val weather: ObservableList<Weather> = ObservableList() // Only for weather
val climate: ObservableList<no.iktdev.display.model.Climate> = ObservableList()
val views: ObservableList<View> = ObservableList()
fun main(args: Array<String>) {
	val storedViewFile = getViewsFile()
	if (storedViewFile.exists()) {
		val read = Reader().read(storedViewFile) ?: return
		//val deserialized = Gson().fromJson<List<View>>(read, object: TypeToken<List<View>>() {}.type)
		//views.addAll(deserialized)
	}
	ip = Networking().getNetworkCapable().first().hostAddress ?: "Offline"
	print(ip)
	context = runApplication<DisplayApplication>(*args)

	views.addListener(object : Listener<View> {
		override fun onAdded(item: View) {
			Views.get()?.pushViews(listOf(item))
			Writer().write(getViewsFile(), Gson().toJson(views.items))
		}

		override fun onRemoved(item: View) {
			Writer().write(getViewsFile(), Gson().toJson(views.items))
		}

		override fun onListChanged(items: List<View>) {
			Views.get()?.pushViews(items)
			Writer().write(getViewsFile(), Gson().toJson(views.items))
		}

		override fun onUpdated(item: View) {
			Views.get()?.pushViews(listOf(item))
		}
	})
	climate.addListener(object : Listener<Climate> {
		override fun onAdded(item: Climate) {
			ClimateSocket.get()?.pushViews(listOf(item))
		}

		override fun onRemoved(item: Climate) {
		}

		override fun onUpdated(item: Climate) {
			ClimateSocket.get()?.pushViews(listOf(item))
		}

		override fun onListChanged(items: List<Climate>) {
			ClimateSocket.get()?.pushViews(items)
		}

	})
	weather.addListener(object : Listener<Weather> {
		override fun onAdded(item: Weather) {
			WeatherSocket.get()?.pushViews(listOf(item))
		}

		override fun onRemoved(item: Weather) {

		}

		override fun onUpdated(item: Weather) {
			WeatherSocket.get()?.pushViews(listOf(item))
		}

		override fun onListChanged(items: List<Weather>) {
			WeatherSocket.get()?.pushViews(items)

		}

	})
}


@Configuration
@EnableWebSocketMessageBroker
class Socket: WebSocketMessageBrokerConfigurer {
	override fun registerStompEndpoints(registry: StompEndpointRegistry) {
		registry
			.addEndpoint("/socket")
			.setAllowedOriginPatterns("*")
			.withSockJS()
	}
	override fun configureMessageBroker(registry: MessageBrokerRegistry) {
		registry.enableSimpleBroker("/push")
		registry.setApplicationDestinationPrefixes("/app")
	}
}
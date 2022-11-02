package no.iktdev.display.providers

import com.apollographql.apollo3.ApolloClient
import com.apollographql.apollo3.exception.ApolloNetworkException
import com.apollographql.apollo3.network.okHttpClient
import com.apollographql.apollo3.network.ws.GraphQLWsProtocol
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.flow.retryWhen
import kotlinx.coroutines.launch
import no.iktdev.display.*
import no.iktdev.display.helper.FilePath
import no.iktdev.display.helper.Writer
import no.iktdev.display.model.LiveWatt
import okhttp3.OkHttpClient
import java.io.File
import java.lang.Exception
import java.nio.file.Paths
import java.time.LocalDateTime
import java.util.concurrent.atomic.AtomicInteger
import java.util.concurrent.atomic.AtomicReference
import javax.annotation.PreDestroy

class Tibber: GraphQlProvider() {
    lateinit var liveLoggFile: File
    var subscriptionClient: AtomicReference<ApolloClient> = AtomicReference(null)

    override fun start() {
        this.liveLoggFile = FilePath.Builder(Paths.get(System.getProperty("user.home")).toFile()).to("tibberLive.txt").build()
        Logger.info(this,"Tibber Live file will be stored at: ${liveLoggFile.absolutePath}")
        scope.launch {
            startSubscription()
        }
    }

    private suspend fun startSubscription() {
        if (this.subscriptionClient.get() != null) {
            this.subscriptionClient.get().close()
        }
        try {
            subscribe()
        } catch (e: ApolloNetworkException ) {
            e.printStackTrace()
            delay(30000)
            startSubscription()
        } catch (e: InvalidMeasurementData) {
            delay(60000)
            startSubscription()
        }
    }


    private suspend fun obtainHomeId(): String? {
        val homes = createClient().use { it.query(TibberHomesQuery()).execute() }
        val home = homes.data?.viewer?.homes?.mapNotNull {
            val time = it?.currentSubscription?.validTo
            try {
                Pair(it?.id, Time.unzoned(time))
            } catch (e: Exception) {
                e.printStackTrace()
                null
            }
        }?.maxByOrNull { it.second }
        return home?.first
    }

    private val nullsReceived: AtomicInteger = AtomicInteger(0)
    private suspend fun subscribe() {
        val obtainedId = this.obtainHomeId()
        if (obtainedId.isNullOrEmpty()) {
            throw IllegalStateException("No valid homes found!")
        }
        Logger.info(this, "Using home with id: $obtainedId")

        Logger.info(this, "Starting Live measurement on home with id: $obtainedId")

        val subscriptionClient = createClient()
        subscriptionClient.subscription(TibberPulseSubscription(obtainedId))
            .toFlow()
            .retryWhen { e, attempt ->
                Logger.error(this, e.message?: "")
                delay(attempt * 1000)
                true
            }
            .collect {
                val measurement = it.data?.liveMeasurement?.power
                val timestamp = it.data?.liveMeasurement?.timestamp
                wattConsumption.next(LiveWatt(
                    id = obtainedId,
                    power = measurement,
                    timestamp = timestamp
                ))
                if (measurement != null) {
                    printToLog(measurement, it.data?.liveMeasurement?.timestamp ?: System.currentTimeMillis().toString())
                }
                else {
                    val nulls = this.nullsReceived.getAndIncrement()
                    if (nulls > 5) {
                        throw InvalidMeasurementData("Tibber provided measurement: $measurement. This value is an indication of subscription failure and code will re-try")
                    }
                }
            }
        this.subscriptionClient.set(subscriptionClient)
    }

    private fun printToLog(value: Double, time: String) {
        val text = "Value: $value @ $time"
        Writer().append(liveLoggFile, text)
    }


    override fun createClient(): ApolloClient {
        val default = defaultBuilder()
            .httpServerUrl("https://api.tibber.com/v1-beta/gql")
            .webSocketServerUrl("wss://api.tibber.com/v1-beta/gql/subscriptions")
            .okHttpClient(httpClient())
        return default.build()
    }

    override fun httpClient(): OkHttpClient {
        return OkHttpClient.Builder()
            .addInterceptor(AuthorizationInterceptor(Configuration.platformWattMeterToken?: ""))
            .build()
    }

    override fun close() {
        if (this.subscriptionClient.get() != null) {
            this.subscriptionClient.get().close()
            Logger.info(this,"@Teardown -> Closing subscription to tibber")
        }
    }

}
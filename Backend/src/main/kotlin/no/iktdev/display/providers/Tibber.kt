package no.iktdev.display.providers

import com.apollographql.apollo3.ApolloClient
import com.apollographql.apollo3.exception.ApolloNetworkException
import com.apollographql.apollo3.network.okHttpClient
import com.apollographql.apollo3.network.ws.GraphQLWsProtocol
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch
import no.iktdev.display.*
import okhttp3.OkHttpClient
import java.lang.Exception
import java.time.LocalDateTime

class Tibber: GraphQlProvider() {
    lateinit var client: ApolloClient

    override fun start() {
        client = createClient()
        scope.launch {
            try {
                subscribe()
            } catch (e: ApolloNetworkException) {
                e.printStackTrace()
                start()
            }
        }
    }

    private suspend fun obtainHomeId(): String? {
        val homes = client.query(TibberHomesQuery()).execute()
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

    private suspend fun subscribe() {
        val obtainedId = this.obtainHomeId()
        if (obtainedId.isNullOrEmpty()) {
            throw IllegalStateException("No valid homes found!")
        }
        Logger.info(this, "Using home with id: $obtainedId")


        val ws = ApolloClient.Builder()
            .httpServerUrl("https://api.tibber.com/v1-beta/gql")
            .webSocketServerUrl("wss://api.tibber.com/v1-beta/gql/subscriptions")
            .okHttpClient(httpClient())
            .build()

        Logger.info(this, "Starting Live measurement on home with id: $obtainedId")
        ws.subscription(TibberPulseSubscription(obtainedId)).toFlow()
            .collect {
                val measurement = it.data?.liveMeasurement?.power
                wattConsumption.next(measurement)
                Logger.info(this@Tibber, "$measurement on home $obtainedId")
            }
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


}
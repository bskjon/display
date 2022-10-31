package no.iktdev.display.providers

import com.apollographql.apollo3.ApolloClient
import com.apollographql.apollo3.network.ws.GraphQLWsProtocol
import no.iktdev.display.Configuration
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.Response

abstract class GraphQlProvider(): ServiceProvider() {

    abstract fun createClient(): ApolloClient
    abstract fun httpClient(): OkHttpClient
    open fun defaultBuilder(): ApolloClient.Builder {
        return ApolloClient.Builder()
            .wsProtocol(GraphQLWsProtocol.Factory())
    }


    protected class AuthorizationInterceptor(private val token: String = ""): Interceptor {
        override fun intercept(chain: Interceptor.Chain): Response {
            val request = chain.request().newBuilder()
                .addHeader("Authorization", token)
                .build()

            return chain.proceed(request)
        }

    }

    class InvalidMeasurementData(override val message: String = "Invalid data received from service") : Exception()
}
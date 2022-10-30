package no.iktdev.display

class Configuration {
    companion object {
        val networkAddressForCheck: String? = System.getenv("WAN_ADDRESS") ?: "google.com"
        val platformWattMeterProvider: String? = System.getenv("METER_PLATFORM")
        val platformWattMeterToken: String? = System.getenv("METER_PLATFORM_TOKEN")
    }
}
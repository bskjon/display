package no.iktdev.display

class Configuration {
    companion object {
        val networkAddressForCheck: String? = System.getenv("WAN_ADDRESS") ?: "google.com"
    }
}
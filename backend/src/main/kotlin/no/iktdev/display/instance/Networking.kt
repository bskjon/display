package no.iktdev.display.instance

import no.iktdev.display.Configuration
import java.io.IOException
import java.net.*
import java.nio.channels.SocketChannel

class Networking {

    private fun hasValidIp(net: NetworkInterface): Boolean {
        return net.isUp && net.inetAddresses.toList().any { it is Inet4Address }
    }

    private fun isActive(net: NetworkInterface): Boolean {
        val inet4 = net.inetAddresses.toList().filter { it is Inet4Address }
        return inet4.filter { it.isReachable(2000) }.isNotEmpty()
    }

    private fun hasInternetAccess(net: NetworkInterface): Boolean {
        for (inet in net.inetAddresses) {
            if (inet !is Inet4Address) {
                continue
            }
            try {
                SocketChannel.open().use { socket ->
                    // again, use a big enough timeout
                    socket.socket().soTimeout = 3000

                    // bind the socket to your local interface
                    socket.bind(InetSocketAddress(inet, 0))

                    // try to connect to *somewhere*
                    socket.connect(InetSocketAddress(Configuration.networkAddressForCheck, 80))
                }
            } catch (ex: IOException) {
                //ex.printStackTrace()
                continue
            }
            return true
        }
        return false
    }

    fun getInterfaces(): List<NetworkInterface> {
        val localIp = getLocalIpAddress()
        val interfaces = NetworkInterface.getNetworkInterfaces().toList()
            .filter { !it.isLoopback && !it.isPointToPoint && hasValidIp(it) && it.inetAddresses.toList().contains(localIp) }
        return interfaces
    }

    private fun getLocalIpAddress(): InetAddress? {
        var ip: InetAddress? = null
        try {
            val interfaces = NetworkInterface.getNetworkInterfaces()
            while (interfaces.hasMoreElements()) {
                val networkInterface = interfaces.nextElement()
                if (networkInterface.isLoopback || !networkInterface.isUp) {
                    continue
                }
                val addresses = networkInterface.inetAddresses
                while (addresses.hasMoreElements()) {
                    val addr = addresses.nextElement()
                    if (addr is Inet4Address && !addr.isLinkLocalAddress) {
                        ip = addr
                        break
                    }
                }
                if (ip != null) {
                    break
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return ip
    }

    fun getNetworkCapable(): List<Inet4Address> {
        val routable = getActiveInterfaces().filter { hasInternetAccess(it) }
        return routable.flatMap { it.inetAddresses.toList().filterIsInstance<Inet4Address>() }
    }

    fun getActiveInterfaces(): List<NetworkInterface> {
        val active = getInterfaces().filter { isActive(it) }
        return active
    }
}

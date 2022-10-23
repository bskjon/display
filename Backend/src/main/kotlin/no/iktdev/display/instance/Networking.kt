package no.iktdev.display.instance

import no.iktdev.display.Configuration
import org.apache.tomcat.jni.Buffer.address
import java.io.IOException
import java.net.Inet4Address
import java.net.InetSocketAddress
import java.net.NetworkInterface
import java.nio.channels.SocketChannel


class Networking {

    private fun hasValidIp(net: NetworkInterface): Boolean {
        return net.isUp && net.inetAddresses.toList().isNotEmpty()
    }

    private fun isActive(net: NetworkInterface): Boolean {
        val inet4 = net.inetAddresses.toList().filter { it !is Inet4Address }
        return inet4.filter { it.isReachable(2000) }.isNotEmpty()
    }

    private fun hasInternetAccess(net: NetworkInterface): Boolean {
        for (inet in net.inetAddresses) {
            try {
                SocketChannel.open().use { socket ->
                    // again, use a big enough timeout
                    socket.socket().soTimeout = 3000

                    // bind the socket to your local interface
                    socket.bind(InetSocketAddress(inet, 8080))

                    // try to connect to *somewhere*
                    socket.connect(InetSocketAddress(Configuration.networkAddressForCheck, 80))
                }
            } catch (ex: IOException) {
                ex.printStackTrace()
                continue
            }
            return true
        }
        return false
    }

    fun getInterfaces(): List<NetworkInterface> {
        val interfaces = NetworkInterface.getNetworkInterfaces().toList().filter { !it.isLoopback && !it.isPointToPoint && hasValidIp(it)}
        return interfaces
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
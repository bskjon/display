package no.iktdev.display.helper

import java.io.File

class FilePath {

    data class Builder(val folder: File) {
        private var fullPath: File = folder
        fun to(partial: String?) = apply { if (!partial.isNullOrEmpty()) {this.fullPath = File(fullPath, partial)} else { throw InvalidFilePathException() } }
        fun build(): File {
            return fullPath
        }
    }

    private class InvalidFilePathException(override val message: String = "Passed partial path is either null, empty or invalid!"): Exception()

}
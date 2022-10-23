import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "2.7.4"
	id("io.spring.dependency-management") version "1.0.14.RELEASE"
	kotlin("jvm") version "1.6.21"
	kotlin("plugin.spring") version "1.6.21"
}

group = "no.iktdev"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_16



repositories {
	mavenCentral()
	maven { url = uri("https://repo.spring.io/milestone") }
	maven { url = uri("https://jitpack.io") }
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-graphql:2.7.4")
	implementation("org.springframework.boot:spring-boot-starter-web:2.7.4")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.13.4")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")

	implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.1-native-mt")
	implementation("com.google.code.gson:gson:2.9.0")
	implementation("org.springframework:spring-websocket:5.3.20")
	implementation("org.springframework:spring-messaging")

	testImplementation("org.springframework.boot:spring-boot-starter-test:2.7.4")
	testImplementation("org.springframework:spring-webflux:5.3.23")
	testImplementation("org.springframework.graphql:spring-graphql-test:1.0.1")
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "16"
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}

tasks.jar {
	archiveFileName.set("backend.jar")
}



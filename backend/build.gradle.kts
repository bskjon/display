import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "2.7.4"
	id("io.spring.dependency-management") version "1.0.14.RELEASE"
	kotlin("jvm") version "1.6.21"
	kotlin("plugin.spring") version "1.6.21"
}

group = "no.iktdev"
version = "0.0.2-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_17
base.archivesBaseName = "backend"



repositories {
	mavenCentral()
	maven { url = uri("https://repo.spring.io/milestone") }
	maven { url = uri("https://jitpack.io") }
	maven {
		url = uri("https://reposilite.iktdev.no/snapshots")
	}
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-graphql:2.7.4")
	implementation("org.springframework.boot:spring-boot-starter-web:3.0.4")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.14.2")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")

	implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.1-native-mt")
	implementation("com.google.code.gson:gson:2.9.0")
	implementation("com.apollographql.apollo3:apollo-runtime:3.6.2")
	implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.4")
	implementation("no.iktdev.apis:Kibber:1.0-SNAPSHOT")

	//implementation("org.springframework.boot:spring-boot-starter-websocket")
	implementation("org.springframework.boot:spring-boot-starter-websocket:2.6.3")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")


	testImplementation("org.springframework.boot:spring-boot-starter-test:2.7.4")
	testImplementation("org.springframework:spring-webflux:5.3.23")
	testImplementation("org.springframework.graphql:spring-graphql-test:1.0.1")

	implementation("org.springframework.boot:spring-boot-starter-actuator")
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

/*tasks.getByName<org.springframework.boot.gradle.tasks.bundling.BootJar>("bootJar") {
	this.archiveFileName.set("${archiveBaseName.get()}.${archiveExtension.get()}")
}*/

tasks.bootJar {
	archiveFileName.set("backend.jar")
	launchScript()
}



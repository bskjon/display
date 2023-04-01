FROM openjdk:18-jdk-alpine

EXPOSE 8080

#COPY ./subby /usr/local/bin/subby
COPY ./backend.jar display.jar

ENTRYPOINT [ "java", "-jar", "/display.jar" ]
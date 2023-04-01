FROM openjdk:8-jdk-buster

EXPOSE 8080

#COPY ./subby /usr/local/bin/subby
COPY ./backend.jar display.jar

ENTRYPOINT [ "java", "-jar", "/display.jar" ]
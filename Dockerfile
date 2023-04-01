FROM bskjon/azuljava:17

EXPOSE 8080

#COPY ./subby /usr/local/bin/subby
COPY ./backend.jar /usr/share/app/app.jar
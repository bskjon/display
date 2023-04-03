FROM bskjon/azuljava:17


EXPOSE 8080

COPY ./backend.jar /usr/share/app/app.jar
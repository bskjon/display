FROM bskjon/dnj:latest

ARG TARGETARCH

COPY ./dist/display/ /usr/share/nginx/html
COPY ./backend.java /usr/share/


# Copy Angular nginx config
COPY nginx.conf /etc/nginx/nginx.conf


ENV AM_I_IN_A_DOCKER_CONTAINER True

EXPOSE 8080
EXPOSE 80

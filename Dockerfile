FROM bskjon/display-base:latest

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

ARG TARGETARCH
COPY dependency-installer.sh /dependency-installer.sh
RUN chmod +x /dependency-installer.sh
RUN /dependency-installer.sh

COPY Web/dist/display/ /usr/share/nginx/html

# RUN \
#     apt update && \
#     apt upgrade -y && \
#     apt install -y --no-install-recommends \
#     nano \
#     python3 \
#     python3-pip \
#     python3-dev \
#     libffi-dev \
#     libssl-dev \
# #    libxml2-dev libxslt1-dev libldap2-dev libsasl2-dev libffi-dev \
#     build-essential \
#     gcc 

RUN mkdir /usr/share/socket
COPY Gateway/ /usr/share/socket
RUN pip install -r /usr/share/socket/requirements.txt

COPY nginx.conf /etc/nginx/nginx.conf


COPY build/docker-entrypoint.d/ /docker-entrypoint.d/
# RUN chmod +x /docker-entrypoint.d/ngssc.sh
RUN chmod +x /docker-entrypoint.d/01-websocket.sh

EXPOSE 5000
EXPOSE 80

#CMD ["nginx", "-g", "daemon off;"]
#ENTRYPOINT [ "/set-ip.sh" ]
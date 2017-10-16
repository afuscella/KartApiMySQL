FROM mysql:5.7
MAINTAINER Arthur Silva <fuscellaarthur@gmail.com>
COPY kartapi.sql /docker-entrypoint-initdb.d/kartapi.sql
ENV PORT=3306
ENV MYSQL_ROOT_PASSWORD=docker
ENV MYSQL_USER=kartapi
ENV MYSQL_PASSWORD=docker
ENV MYSQL_DATABASE=kart
EXPOSE $PORT
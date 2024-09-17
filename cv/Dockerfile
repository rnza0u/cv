FROM nginx:1.27.1-alpine-slim

RUN rm -rf /usr/share/nginx/html/*

COPY dist/ /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d/*
COPY conf/nginx.conf /etc/nginx/nginx.conf
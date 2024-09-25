FROM nginx:1.27.1-alpine-slim

ARG CV_BUNDLE=dist/

RUN rm -rf /usr/share/nginx/html/*

COPY ${CV_BUNDLE} /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d/* 
COPY conf/nginx.conf /etc/nginx/nginx.conf
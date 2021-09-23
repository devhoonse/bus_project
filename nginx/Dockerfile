FROM nginx:latest

COPY default.conf /etc/nginx/conf.d/default.conf
COPY server-status.conf /etc/nginx/conf.d/server-status.conf
COPY nginx.conf /etc/nginx/nginx.conf

COPY ./ssl/gomata.crt /etc/nginx/gomata.crt
COPY ./ssl/gomata.key /etc/nginx/gomata.key

#RUN ln -sf /var/container_log/nginx/access.container_log /var/container_log/nginx/access.container_log \
# && ln -sf /var/container_log/nginx/error.container_log /var/container_log/nginx/error.container_log

CMD ["nginx", "-g", "daemon off;"]

FROM nginx:latest

COPY default.conf /etc/nginx/conf.d/default.conf
COPY server-status.conf /etc/nginx/conf.d/server-status.conf
COPY nginx.conf /etc/nginx/nginx.conf

COPY hunet_ssl.crt /etc/nginx/hunet_ssl.crt
COPY star_hunet_co_kr.key /etc/nginx/star_hunet_co_kr.key

RUN ln -sf /var/log/nginx/access.log /var/log/nginx/access.log \
 && ln -sf /var/log/nginx/error.log /var/log/nginx/error.log

CMD ["nginx", "-g", "daemon off;"]

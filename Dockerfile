FROM nginx:1.19.10-alpine

# Create www-data user
RUN set -x ; \
  addgroup -g 82 -S www-data ; \
  adduser -u 82 -D -S -G www-data www-data && exit 0 ; exit 1

FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Upload application
ADD ./public /var/www/ceddlbyexample.com/
RUN chmod -R 777 /var/www/ceddlbyexample.com
# Start nginx
EXPOSE 80

CMD nginx

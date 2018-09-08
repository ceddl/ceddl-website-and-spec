FROM node:8.11.4-alpine

# Create www-data user
RUN set -x ; \
  addgroup -g 82 -S www-data ; \
  adduser -u 82 -D -S -G www-data www-data && exit 0 ; exit 1

# Upload application
ADD . /var/www/ceddlbyexample.com/

# Set permissions for nginx
RUN chgrp www-data -R /var/www
RUN chmod g+s /var/www
RUN chmod u+s /var/www

# Start nginx and nodejs app.
CMD cd /var/www/ceddlbyexample.com/ && node server.js && tail -f /dev/null
EXPOSE 8090


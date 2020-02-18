# use lightweight alpine version of nginx
FROM nginx:alpine

# Copy app bundle to wwwroot
COPY build /usr/share/nginx/html

# Copy robots.txt file to wwwroot
COPY robots.txt /usr/share/nginx/html

# Set custom nginx config to rewrite docs to index target
COPY nginx.conf /etc/nginx/conf.d/default.conf
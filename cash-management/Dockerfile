FROM node:14.8.0-alpine
RUN npm install -g npm@6.14.7
RUN mkdir -p /var/www/cash-management
WORKDIR /var/www/cash-management
ADD . /var/www/cash-management
RUN npm install
CMD npm run build && npm run start:prod

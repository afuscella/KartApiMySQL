FROM node:latest
MAINTAINER Arthur Silva <fuscellaarthur@gmail.com>
ENV PORT=3000
ENV NODE_ENV=development
COPY . /var/www
WORKDIR /var/www
RUN npm install
ENTRYPOINT ["npm", "start"]
EXPOSE $PORT
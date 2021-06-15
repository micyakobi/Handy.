FROM node
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN mkdir -p uploads
RUN mkdir -p sslcert
RUN npm install
CMD "npm" "start"

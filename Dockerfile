# Setting the base to nodejs 10.1.0
FROM node:10.8.0-alpine@sha256:962dc023d8598778df81a1a52719bd4ed7f341661742330bfdc72ca8241e58d6

#### Begin setup ####

# Installs git
RUN apk add --update --no-cache git

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Expose 8000
EXPOSE 8000

# Startup
ENTRYPOINT npm start

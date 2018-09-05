# Setting the base to nodejs 10.1.0
FROM node:10.9.0-alpine@sha256:3c8d1894236663c8efd24dc6e979b0f927e81b711e6023b52e5b4617d45b619f

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

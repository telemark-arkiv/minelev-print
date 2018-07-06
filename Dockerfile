# Setting the base to nodejs 10.1.0
FROM node:10.6.0-alpine@sha256:e771c64a6bd0d64179de2c803c1af491ca4ce2dc418428525f2f7216495b18be

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

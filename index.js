const routes = require('./routes')
const auth = require('./routes/auth')
const systems = require('./routes/systems')
const print = require('./routes/print')

exports.register = (server, options, next) => {
  server.route(routes)
  server.route(auth)
  server.route(systems)
  server.route(print)
  next()
}

exports.register.attributes = {
  pkg: require('./package.json')
}

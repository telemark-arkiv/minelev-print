const handlers = require('../handlers/print')

module.exports = [
  {
    method: 'GET',
    path: '/print/{documentID}',
    handler: handlers.generateDocument,
    config: {
      description: 'Get document for printing'
    }
  }
]

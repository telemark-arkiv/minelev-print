const test = require('ava')
const handlers = require('../../handlers/print')

test('print handlers test', t => {
  t.truthy(handlers.generateDocument, 'handler has method generateDocument')
})

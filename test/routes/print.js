const test = require('ava')
const routes = require('../../routes/print')

test('There are 1 print route', t => {
  t.is(1, routes.length, 'Print routes ok')
})

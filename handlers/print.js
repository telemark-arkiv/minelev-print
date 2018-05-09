const fs = require('fs')
const axios = require('axios')
const getDocumentTemplatesPath = require('tfk-saksbehandling-minelev-templates')
const FormData = require('form-data')
const config = require('../config')
const prepareDocumentPreview = require('../lib/prepare-document-preview')
const prepareYffDocumentPreview = require('../lib/prepare-yff-document-preview')
const generateSystemJwt = require('../lib/generate-system-jwt')
const getTemplateType = require('../lib/get-template-type')
const logger = require('../lib/logger')

module.exports.generateDocument = async (request, reply) => {
  const userId = request.auth.credentials.data.userId
  const documentId = request.params.documentID
  const fileName = `${documentId}.pdf`
  const url = `${config.LOGS_SERVICE_URL}/logs/${documentId}`
  const token = generateSystemJwt(userId)

  axios.defaults.headers.common['Authorization'] = token

  logger('info', ['print', 'generateDocument', 'userId', userId, 'documentId', documentId])

  const { data: results } = await axios(url)

  logger('info', ['print', 'generateDocument', 'userId', userId, 'documentId', documentId, 'documents', results.length])

  let data = results[0]

  const previewData = data.documentType === 'yff' ? prepareYffDocumentPreview(data) : prepareDocumentPreview(data)
  const template = getDocumentTemplatesPath(getTemplateType(data))
  let templaterForm = new FormData()

  logger('info', ['print', 'generateDocument', 'userId', userId, 'studentUserName', data.studentUserName, 'start'])

  Object.keys(previewData).forEach(key => {
    templaterForm.append(key, previewData[key])
  })

  templaterForm.append('file', fs.createReadStream(template))

  templaterForm.submit(config.PDF_SERVICE_URL, (error, pdf) => {
    if (error) {
      logger('error', ['print', 'generateDocument', 'userId', userId, 'studentUserName', data.studentUserName, error])
      reply(error)
    } else {
      reply(pdf)
        .header('Content-Type', 'application/pdf')
        .header('Content-Disposition', 'attachment; filename=' + fileName)
    }
  })
}

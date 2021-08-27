/*******************************************************************
*
* TOKEN
*
* - /v1/token/build
*   => rarepress.token.build(req.body)
*
* - /v1/token/save
*   => rarepress.token.save(req.body)  // 1. save token
*
* - /v1/token/send
*   => rarepress.token.save(req.body[0])  // 1. save token
*   => rarepress.token.send(req.body[1])  // 2. send token
*
* - /v1/token/query
*   => rarepress.token.query(req.body)
*
* - /v1/token/queryOne
*   => rarepress.token.queryOne(req.body)
i*
* - /v1/token/files
*   => rarepress.token.files(req.body)
*
*******************************************************************/
class TokenController {
  constructor(rarepress, app, version) {
    app.post('/v' + version + '/token/build', async (req, res) => {
      if (req.body) {
        try {
          const token = await rarepress.token.build(req.body)
          res.json(token)
        } catch (e) {
          console.log("error", e)
          res.status(500).send(e.message)
        }
      } else {
        res.status(500).send("requires a body")
      }
    })
    app.post('/v' + version + '/token/signable', async (req, res) => {
      try {
        let signable = await rarepress.token.signable(req.body)
        res.json(signable)
      } catch (e) {
        console.log("🧕 error", e)
        res.status(500).send(e.message)
      }
    })
    app.post('/v' + version + '/token/save', async (req, res) => {
      try {
        let token = await rarepress.token.save(req.body)
        res.json(token)
      } catch (e) {
        console.log("🧕 error", e)
        res.status(500).send(e.message)
      }
    })
    app.post('/v' + version + '/token/send', async (req, res) => {
      if (req.body) {
        try {
          let sent = await rarepress.token.send(req.body[0], req.body[1])
          res.json(sent)
        } catch (e) {
          console.log("🧕 error", e)
          if (e.response) {
            res.status(500).send(e.response.data.message)
          } else {
            res.status(500).send(e.message)
          }
        }
      } else {
        res.status(500).send('body and sig attributes must be sent')
      }
    })
    app.post('/v' + version + '/token/query', async (req, res) => {
      if (req.body) {
        try {
          let response = await rarepress.token.query(req.body)
          res.json(response)
        } catch (e) {
          console.log("🧕 error", e)
          res.status(500).send(e.message)
        }
      } else {
        res.status(500).send('body attribute is required')
      }
    })
    app.post('/v' + version + '/token/queryOne', async (req, res) => {
      if (req.body) {
        try {
          let response = await rarepress.token.queryOne(req.body)
          res.json(response)
        } catch (e) {
          console.log("🧕 error", e)
          res.status(500).send(e.message)
        }
      } else {
        res.status(500).send('body attribute is required')
      }
    })
    app.post('/v' + version + '/token/files', async (req, res) => {
      try {
        let files = await rarepress.token.files(req.body)
        res.json(files)
      } catch (e) {
        console.log("🧕 error", e)
        res.status(500).send(e.message)
      }
    })
  }
}
module.exports = TokenController

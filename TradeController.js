/*******************************************************************
*
* TRADE
*
* All payloads are stored under "body" or "url" attributes
*
* - /v1/trade/build
*   => rarepress.trade.build(req.body)
*
* - /v1/trade/save
*   => rarepress.trade.save(req.body)  // 1. save trade
*
* - /v1/trade/send
*   => rarepress.trade.save(req.body[0])  // 1. save trade
*   => rarepress.trade.send(req.body[1])  // 2. send trade
*
* - /v1/trade/query
*   => rarepress.token.query(req.body)
*
* - /v1/trade/queryOne
*   => rarepress.trade.queryOne(req.body)
*
*******************************************************************/
class TradeController {
  constructor(rarepress, app, version) {
    app.post('/v' + version + '/trade/build', async (req, res) => {
      if (req.body) {
        try {
          const r = await rarepress.trade.build(req.body)
          res.json(r)
        } catch (e) {
          console.log("error", e)
          res.status(500).send(e.message)
        }
      } else {
        res.status(500).send("requires a 'body' field")
      }
    })
    app.post('/v' + version + '/trade/signable', async (req, res) => {
      try {
        let signable = await rarepress.trade.signable(req.body)
        res.json(signable)
      } catch (e) {
        console.log("🧕 error", e)
        res.status(500).send(e.message)
      }
    })
    app.post('/v' + version + '/trade/save', async (req, res) => {
      if (req.body) {
        try {
          await rarepress.trade.save(req.body)
          res.json(req.body)
        } catch (e) {
          if (e.response) {
            console.log("error", e.response)
            res.status(500).send(e.response.data.message)
          } else {
            console.log("error", e)
            res.status(500).send(e.message)
          }
        }
      } else {
        res.status(500).send("requires a 'body' field")
      }
    })
    app.post('/v' + version + '/trade/send', async (req, res) => {
      if (req.body) {
        try {
          let sent = await rarepress.trade.send(req.body[0], req.body[1])
          res.json(sent)
        } catch (e) {
          if (e.response) {
            console.log("error", e.response)
            res.status(500).send(e.response.data.message)
          } else {
            console.log("error", e)
            res.status(500).send(e.message)
          }
        }
      } else {
        res.status(500).send("requires a 'body' field")
      }
    })
    app.post('/v' + version + '/trade/query', async (req, res) => {
      if (req.body) {
        try {
          let response = await rarepress.trade.query(req.body)
          res.json(response)
        } catch (e) {
          console.log("🧕 error", e)
          res.status(500).send(e.message)
        }
      } else {
        res.status(500).send('body attribute is required')
      }
    })
    app.post('/v' + version + '/trade/queryOne', async (req, res) => {
      if (req.body) {
        try {
          let response = await rarepress.trade.queryOne(req.body)
          res.json(response)
        } catch (e) {
          console.log("🧕 error", e)
          res.status(500).send(e.message)
        }
      } else {
        res.status(500).send('body attribute is required')
      }
    })
  }
}
module.exports = TradeController

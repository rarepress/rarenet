class RarebaseController {
  constructor(rarepress, app, version) {
    app.get('/v' + version + '/user/:address/tokens/:id', async (req, res) => {
      let result = await rarepress.db.token.findOne(req.params.address.toLowerCase(), {
        query: { tokenId: req.params.id },
      })
      res.json({ result })
    })
    app.get('/v' + version + '/user/:address/tokens', async (req, res) => {
      let skip = (req.query && req.query.skip ? parseInt(req.query.skip) : 0);
      let limit = (req.query && req.query.limit ? Math.min(parseInt(req.query.limit), 100) : 100);
      let result = await rarepress.db.token.find(req.params.address.toLowerCase(), {
        query: { },
        skip: skip,
        limit: limit,
        sort: { tokenId: -1 }
      })
      res.json({ result })
    })
  }
}
module.exports = RarebaseController

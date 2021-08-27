const multer  = require('multer')
const fs = require('fs')
class FSController {
  constructor(rarepress, app, version) {
    let max = (rarepress.fs.max ? rarepress.fs.max : 100)
    let upload = multer({
      dest: `${rarepress.fs.path}/uploads/`,
      limits: {
        fileSize: max * 1000 * 1000 // 100MB
      }
    })
    console.log("connecting to IPFS")
    rarepress.fs.connect().then(() => {
      console.log("connected to IPFS")
    })
    app.post('/v' + version + '/fs/push', async (req, res) => {
      const cid = await rarepress.fs.push(req.body.cid)
      res.json({ cid })
    })
    app.post('/v' + version + '/fs/add', upload.single('file'), async (req, res) => {
      const cid = await rarepress.fs.add(`${rarepress.fs.path}/uploads/${req.file.filename}`)
      res.json({ cid })
    })
    app.post('/v' + version + "/fs/folder", async (req, res) => {
      let cid = await rarepress.fs.folder(req.body)
      res.json({ cid })
    })
    app.post('/v' + version + '/fs/import', async (req, res) => {
      if (req.body.url && req.body.url.startsWith("http")) {
        try {
          const cid = await rarepress.fs.add(req.body.url)
          res.json({ cid })
        } catch (e) {
          res.status(500).send("cannot import file")
        }
      } else {
        res.status(500).send("invalid url")
      }
    })
  }
}
module.exports = FSController

const CONFIG = require('./config')
const Rarepress = require('rarepress');
const express = require('express');
const cors = require('cors')
const Rareview = require('rareview');
const TradeController = require('./TradeController')
const TokenController = require('./TokenController')
const FSController = require('./FSController')
const RarebaseController = require('./RarebaseController')
class Rarenet {
  constructor () {
    this.app = express();
    this.app.use(cors())
    this.app.options('*', cors())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
    this.rarepress = new Rarepress({ wallet: false })
  }
  async init(config) {
    await this.rarepress.init(config)
    let args = [this.rarepress, this.app, 1]
    this.tradeController = new TradeController(...args)
    this.tokenController = new TokenController(...args)
    this.fsController = new FSController(...args)
    this.dbController = new RarebaseController(...args)
    
    const port = (process.env.PORT ? process.env.PORT : 5000)
    this.app.listen(port, () => {
      console.log("listening at http://localhost:"+ port)
    })
    this.rareview = new Rareview(...args)
  }
}
let rarenet = new Rarenet()
rarenet.init(CONFIG)

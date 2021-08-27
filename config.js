require('dotenv').config()

var IPFSConfig = {}
if (process.env.IPFS_ADDRESSES_SWARM && process.env.IPFS_ADDRESSES_API && process.env.IPFS_ADDRESSES_GATEWAY) {
  IPFSConfig = {
    Addresses: {
      Swarm: process.env.IPFS_ADDRESSES_SWARM.split(","),
      API: process.env.IPFS_ADDRESSES_API,
      Gateway: process.env.IPFS_ADDRESSES_GATEWAY
    }
  }
}

const SQLITE3Config = {
  "client": "sqlite3",
  "connection": {
    "filename": process.env.FS_PATH + "/db.sqlite3"
  }
}
if (process.env.SQLITE3_PATH) {
  SQLITE3Config.connection = {
    "filename": process.env.SQLITE3_PATH + "/db.sqlite3"
  }
} else if (process.env.FS_PATH) {
  SQLITE3Config.connection = {
    "filename": process.env.FS_PATH + "/db.sqlite3"
  }
}

const config = {
  "postgres": {
    "wallet": false,
    "network": process.env.NETWORK,
    "fs": {
      "path": process.env.FS_PATH,
      "max": process.env.FS_MAX,
      "config": IPFSConfig,
    },
    "db": {
      "client": "postgresql",
      "connection": {
        "ssl": {
          "rejectUnauthorized": false 
        },
        "host": process.env.PG_HOST,
        "database": (process.env.PG_DATABASE ? process.env.PG_DATABASE : "rarebase"),
        "port": process.env.PG_PORT,
        "user": process.env.PG_USER,
        "password": process.env.PG_PASSWORD
      },
      "pool": {
        "min": 2,
        "max": 10
      }
    }
  },
  "sqlite3": {
    "wallet": false,
    "network": process.env.NETWORK,
    "fs": {
      "path": process.env.FS_PATH,
      "max": process.env.FS_MAX,
      "config": IPFSConfig,
    },
    "db": SQLITE3Config
  }
}
const DBTYPE = (process.env.DB ? process.env.DB : "sqlite3")
module.exports = config[DBTYPE]

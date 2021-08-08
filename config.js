require('dotenv').config()

module.exports = {
  botInfo: {
    token: process.env.BOT_TOKEN,
    public_key: process.env.BOT_PUBLIC_KEY,
    id: process.env.BOT_ID,
  },
  defaultSettings: {
    prefix: process.env.PREFIX
  }
}
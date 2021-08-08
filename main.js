const Eris = require("eris");
const { botInfo } = require("./config")


const client = new Eris(botInfo.token)

client.on("messageCreate",(msg) => {
  if(msg.content.startsWith("!ping"))
    msg.channel.createMessage("Pong!")
}) 

client.on("ready",() => {
  console.log("Je suis pret!")
})

client.connect()
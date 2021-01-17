const oci = require('oci.js');
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const commands = require("./lib/commands/commands");
const app = express();
const port = 3000;

dotenv.config();

//Global variables
const streamer = process.env.CHANNEL;
const botName = process.env.BOT_NAME;
const bannedWords = ["shit", "testit"];


//Initiate the bot using oci.js
const bot = oci.Client({
    AccessToken: process.env.ACCESS_TOKEN,
    StreamKey: process.env.STREAM_KEY,
    OwncastUrl: process.env.OWNCAST_URL,
    BotUsername: botName
});


app.use(bodyParser.json());

/* 
ROUTE SET TO ACCEPT INCOMING WEBHOOKS 
I'd recommend setting up a firewall to only 
allow requests to come from your Owncast server. 
*/
app.post('/', (req, res) => {

    if(req.body.type == 'CHAT'){

        //Message variables
        let author = req.body.eventData.author;
        let messageId = req.body.eventData.id;
        let commandString = req.body.eventData.rawBody;

        //Send Message to Command Handler
        if(commandString.startsWith(process.env.PREFIX)){
            commands.handleCommand(bot, botName, streamer, author, messageId, commandString);
        }

    }

});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});


//client.sendUserMessage("testing message from bot");
//client.sendSystemMessage("System Message");
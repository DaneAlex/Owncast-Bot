# Owncast-Bot
 Example Owncast bot created using the oci.js package

## Clone and install the bot
```bash
$ git clone https://github.com/DaneAlex/Owncast-Bot.git
$ cd Owncast-Bot
$ npm install
```

## Create the .env file

### Copy the provided example file
```bash
$ cp .env.example .env
```

Then edit the newly created file with your settings for your Owncast Instance.

## Test the Bot
```bash 
$ npm dev
```

This will use nodemon to launch the bot in development mode. You should see the console/terminal window return "Listening on 3000" if npm installed as expected. 

## Add or Edit Commands

The commands for incoming chat messages are handled in the ./lib/commands/commands.js package. 

## Host The Bot

Since you need to be able to send a webhook from Owncast to this app for the bot to work correctly, you will need to expose the express server in this app to the web or directly to the Owncast server.

I recommend using something like ngrok to temporarily expose the app or heroku for deploying it for use. 
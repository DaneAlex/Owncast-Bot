let failCount = 0;

function handleCommand(bot, botName, streamer, author, messageId, commandString) {

    //Ignore messages from the bot itself.
    if(author == botName) { return };

    //Example of checking messages for a word listed in our "bannedWords" array.
    if(new RegExp(bannedWords.join("|")).test(commandString.toLowerCase())){
        bot.sendSystemMessage(`Timeout pending for ${author}`);
        return;
    }

    var command = commandString.replace(process.env.PREFIX, "");

    switch(command.toLowerCase()){

        case "hello":
            //Basic hello command with response to user.
            bot.sendUserMessage(`Hello ${author}`);
            break;

        case "ping":
            bot.sendUserMessage("Pong");
            break;

        case "fail":
            //Example "death" counter, etc.
            failCount++;
            console.log(failCount);
            bot.sendUserMessage(`Dane_Alex has failed ${failCount} times.`);
            break;

        case "resetfailcounter":
            if(author.toLowerCase() == streamer.toLowerCase()){
                failCount = 0;
                bot.sendUserMessage(`Fail counter has been reset to ${failCount}`);
            }
            break;

        case "raffle":
            //Example of protected giveaway command only streamer can run.
            if(author.toLowerCase() != streamer.toLowerCase()){ return bot.sendUserMessage(`Sorry, ${author}, you're not authorized for that`); }

            bot.getCurrentUsers(res => {
                var eligibleUsers = [];
                res.map(user => {
                    if(user.username != null && user.username.toLowerCase() != streamer.toLowerCase()){
                        eligibleUsers.push(user);
                    }
                });
                if(eligibleUsers.length == 0 ) { 
                    return bot.sendUserMessage("Not enough users to run the raffle."); 
                }
                var user = eligibleUsers[Math.floor(Math.random() * eligibleUsers.length)];
                bot.sendSystemMessage(`${user.username} has won the raffle`);
            });
            break;

        default:
    }
}

module.exports = { handleCommand }
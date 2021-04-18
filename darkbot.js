// const Discord = require('discord.js');
// const { promisify } = require("util");
// const readdir = promisify(require("fs").readdir);
// const Enmap = require("enmap");
// const bot = new Discord.Client();
// bot.config = require('./config.js');
// require("./core/functions.js")(bot);
// bot.commands = new Enmap();
// bot.aliases = new Enmap();
// bot.settings = new Enmap({ name: "settings" });

// const init = async () => {
//     const cmdFiles = await readdir("./commands/");
//     console.log(`Intotaal zijn er ${cmdFiles.length} events geladen.`);
//     cmdFiles.forEach(f => {
//         if (!f.endsWith(".js")) return;
//         const response = bot.loadCommand(f);
//         if (response) console.log(response);
//     });

//     const evtFiles = await readdir("./events/");
//     console.log(`Intotaal zijn er ${evtFiles.length} events geladen.`);
//     evtFiles.forEach(file => {
//         const eventName = file.split(".")[0];
//         console.log(`${eventName} is geladen`);
//         const event = require(`./events/${file}`);
//         bot.on(eventName, event.bind(null, bot));
//     });

//     bot.levelCache = {};
//     for (let i = 0; i < bot.config.permLevels.length; i++) {
//         const thisLevel = bot.config.permLevels[i];
//         bot.levelCache[thisLevel.name] = thisLevel.level;
//     }
//     bot.login(bot.config.token);
// }
// init();

const Discord = require('discord.js');
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const bot = new Discord.Client();
bot.config = require('./core/config.js');
require("./core/functions.js")(bot);
bot.commands = new Enmap();
bot.aliases = new Enmap();
bot.settings = new Enmap({ name: "settings" });

bot.on('guildMemberAdd', member => {
    // member.guild.channels.get("642834112746618881").send({files: ["https://66.media.tumblr.com/3fb87b0fa37048304542fc8785bd4b97/64a5bceb89f2f9c5-80/s1280x1920/d9b85d78be10c190016b3a6db05af5def768a3b7.gifv"]});
    var channel = member.guild.channels.get("604442606537015327")
    var icon = member.avatarURL;
    var botEmbed = new discord.RichEmbed()
        .setDescription(`Welcome New Survivor`)
        .setColor(0x0000000)
        .setImage("https://66.media.tumblr.com/3fb87b0fa37048304542fc8785bd4b97/64a5bceb89f2f9c5-80/s1280x1920/d9b85d78be10c190016b3a6db05af5def768a3b7.gif")
        .setThumbnail(icon)
        .setFooter(`You are the ${channel.guild.memberCount}th member`)
    member.guild.channels.get("604442606537015327").send(`Hey ${member}, Welcome to ${member.guild.name} where you can talk about sao series :AsunaYay: don't forget to check the <#604441187071557705> for server rules and check <#618867111824982031> to see and know how to role yourself!`)
    member.guild.channels.get("604442606537015327").send(botEmbed)
});

const init = async () => {
    const cmdFiles = await readdir("./commands/");
    console.log(`Loading a total of ${cmdFiles.length} commands.`);
    cmdFiles.forEach(f => {
        if (!f.endsWith(".js")) return;
        const response = bot.loadCommand(f);
        if (response) console.log(response);
    });

    const evtFiles = await readdir("./events/");
    console.log(`Loading a total of ${evtFiles.length} events.`);
    evtFiles.forEach(file => {
        const eventName = file.split(".")[0];
        console.log(`Loading Event: ${eventName}`);
        const event = require(`./events/${file}`);
        bot.on(eventName, event.bind(null, bot));
    });

    bot.levelCache = {};
    for (let i = 0; i < bot.config.permLevels.length; i++) {
        const thisLevel = bot.config.permLevels[i];
        bot.levelCache[thisLevel.name] = thisLevel.level;
    }
    bot.login(bot.config.token);
}
init();

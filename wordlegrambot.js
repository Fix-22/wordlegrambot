const fs = require("fs");
const { Telegraf } = require("telegraf");

const conf = JSON.parse(fs.readFileSync("conf.json"));

const token = conf.telegramkey;
const bot = new Telegraf(token);

bot.start(context => {
    context.reply("Benvenuto");
});

bot.command("name", async context => {
    context.reply(context.chat.first_name);
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
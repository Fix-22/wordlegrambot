const fs = require("fs");
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const wordle = require("./wordle");

const conf = JSON.parse(fs.readFileSync("conf.json"));
let words = [];

try {
    const data = fs.readFileSync("parole.txt", "utf8");
    words = data.replaceAll("\r", "").split("\n");
}
catch (err) {
    console.error(err);
}

const token = conf.telegramkey;
const bot = new Telegraf(token);
const game = wordle(words);

bot.start(context => {
    context.reply("Benvenuto");
});

bot.command("new", async context => {
    game.start();
    context.reply("Iniziamo!\nScrivi una parola di <b>5</b> lettere." + "\n\n" + Object.values(game.graph()).join("\n"), {"parse_mode": "HTML"});
});

bot.on(message("text"), context => {
    if (game.isStarted()) {
        if (game.attempt(context.message.text)) {
            context.reply(Object.values(game.display()).join("\n") + "\n\n" + Object.values(game.graph()).join("\n"), {"parse_mode": "HTML"});

            if (!game.status()) {
                if (game.isWon()) {
                    context.reply("Hai vinto!");
                }
                else {
                    context.reply("Hai perso, la parola era <b>" + game.getSelectedWord() + "</b>", {"parse_mode": "HTML"});
                }
            }
        }
        else {
            context.reply("La parola <i><b>" + context.message.text + "</b></i> non è valida.", {"parse_mode": "HTML"});
        }
    }
    else {
        context.reply("Per iniziare una nuova partita usa /new.");
    }
})

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
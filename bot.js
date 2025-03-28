const fs = require("fs");
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const wordle = require("./wordle");

let conf = {};
let words = [];

try {
    conf = JSON.parse(fs.readFileSync("conf.json"));
}
catch (err) {
    console.error(err);
}

try {
    words = fs.readFileSync("parole.txt", "utf8").replaceAll("\r", "").split("\n");
}
catch (err) {
    console.error(err);
}

const token = conf.telegramkey;
const bot = new Telegraf(token);
const game = wordle(words);

bot.start(context => {
    if (!game.isStarted()) {
        context.reply("Benvenuto.\nPer iniziare una nuova partita usa /new.");
    }
    else {
        context.reply("Per iniziare una nuova partita usa /new.");
    }
});

bot.command("new", async context => {
    game.start();
    context.reply("Iniziamo!\nScrivi una parola di <b>5</b> lettere." + "\n\n" + Object.values(game.graph()).join("\n"), {"parse_mode": "HTML"});
});

bot.on(message("text"), context => {
    if (game.isStarted()) {
        if (game.attempt(context.message.text)) {
            let msg = Object.values(game.display()).join("\n") + "\n\n" + Object.values(game.graph()).join("\n");

            if (!game.status()) {
                if (game.isWon()) {
                    msg += "\n\nHai vinto!\nPer iniziare una nuova partita usa /new.";
                }
                else {
                    msg += "\n\nHai perso, la parola era: '<b>" + game.getSelectedWord() + "</b>'.\nPer iniziare una nuova partita usa /new.";
                }
            }

            context.reply(msg, {"parse_mode": "HTML"});
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
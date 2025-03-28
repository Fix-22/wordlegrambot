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

bot.start(context => { // metodo per /start
    if (!game.isStarted()) { // controlla se è partito il gioco
        context.reply("Benvenuto.\nPer iniziare una nuova partita usa /new.");
    }
    else {
        context.reply("Per iniziare una nuova partita usa /new.");
    }
});

bot.command("new", async context => { // metodo per /new
    game.start();
    context.reply("Iniziamo!\nScrivi una parola di <b>5</b> lettere." + "\n\n" + Object.values(game.graph()).join("\n"), {"parse_mode": "HTML"});
});

bot.on(message("text"), context => { // metodo per controllare i messaggi di testo
    if (game.isStarted()) { // controlla se è partito il gioco
        if (game.attempt(context.message.text)) { // fa una prova con il testo
            let msg = Object.values(game.display()).join("\n") + "\n\n" + Object.values(game.graph()).join("\n");

            if (!game.status()) { // controlla lo stato, true il gioco continua, false non continua
                if (game.isWon()) { // controlla se è vinto
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

bot.launch(); // fa partire il bot
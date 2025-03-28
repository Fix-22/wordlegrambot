const wordle = (inputWords) => {
    const words = inputWords;
    let started, selectedWord, remainingAttempts, display, count, graph, victory;

    const selectWord = (words) => { // seleziona randomicamente una parola dall'array delle parole
        return words && words.length > 0 ? words[Math.floor(Math.random() * words.length)] : null;
    };

    const letterInWord = (letter, word,) => { // controlla se una lettera è presente nella parola corretta
        for (let i = 0; i < word.length; i++) {
            if (letter === word[i]) {
                return true;
            }       
        }
    }

    return {
        start: () => { // fa partire il gioco
            started = true;
            selectedWord = selectWord(words);
            remainingAttempts = 6;
            display = {
                0: "",
                1: "",
                2: "",
                3: "",
                4: "",
                5: "",
            }
            graph = {
                0: "⬛️⬛️⬛️⬛️⬛️",
                1: "⬛️⬛️⬛️⬛️⬛️",
                2: "⬛️⬛️⬛️⬛️⬛️",
                3: "⬛️⬛️⬛️⬛️⬛️",
                4: "⬛️⬛️⬛️⬛️⬛️",
                5: "⬛️⬛️⬛️⬛️⬛️",
            }
            count = 0;
            victory = false;
            console.log(selectedWord)
        },
        attempt: (inputWord) => { // prova ad indovinare con una parola
            if (remainingAttempts <= 0 || inputWord.length !== 5) { // se ha esaurito i tentativi o la parola non è di cinque lettere
                return false;
            }
            
            const word = inputWord.toLowerCase();
            const idx = words.indexOf(word);

            if (idx !== -1) { // se non c'è la parola nell'array delle parole
                let wordToDisplay = "";
                let row = "";
                remainingAttempts--;

                if (word === selectedWord) {
                    wordToDisplay = "<b>" + word + "</b>";
                    row = "🟩🟩🟩🟩🟩";
                    victory = true;
                    started = false;
                }
                else {
                    for (let i = 0; i < word.length; i++) {
                        if (word[i] === selectedWord[i]) { // bold per le lettere in posizione corretta
                            wordToDisplay += "<b>" + word[i] + "</b>";
                            row += "🟩";
                        }
                        else if (letterInWord(word[i], selectedWord)) { // italic per le lettere presenti non in posizione corretta
                            wordToDisplay += "<i>" + word[i] + "</i>";
                            row += "🟨";
                        }
                        else {
                            wordToDisplay += "<s>" + word[i] + "</s>"; // sbarrato per quelle non presenti
                            row += "⬜️";
                        }
                    }
                }

                display[count] = wordToDisplay.toUpperCase();
                graph[count++] = row;

                if (remainingAttempts <= 0) {
                    started = false;
                }

                return true;
            }
            else {
                return false;
            }
        },
        display: () => { // restituisce tutte le parole formattate con le regole definite
            return display;
        },
        graph: () => { // restituisce il grafico a colori delle paorle
            return graph;
        },
        status: () => { // controlla se il gioco può andare avanti
            return remainingAttempts > 0 && !victory;
        },
        isWon: () => {
            return victory;
        },
        getSelectedWord: () => {
            return selectedWord;
        },
        isStarted: () => {
            return started;
        }
    };
}

module.exports = wordle;
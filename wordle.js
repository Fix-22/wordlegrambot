const wordle = (inputWords) => {
    const words = inputWords;
    let started = false, selectedWord, remainingAttempts, display, count, graph, victory;

    const selectWord = (words) => {
        return words && words.length > 0 ? words[Math.floor(Math.random() * words.length)] : null;
    };

    const letterInWord = (letter, word) => {
        for (let i = 0; i < word.length; i++) {
            if (letter === word[i]) {
                return true;
            }       
        }
    }

    return {
        start: () => {
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
                0: "",
                1: "",
                2: "",
                3: "",
                4: "",
                5: "",
            }
            count = 0;
            victory = false;
            console.log(selectedWord)
        },
        attempt: (inputWord) => {
            if (remainingAttempts <= 0 || inputWord.length !== 5) {
                return false;
            }
            
            const word = inputWord.toLowerCase();
            const idx = words.indexOf(word);

            if (idx !== -1) {
                let wordToDisplay = "";
                let row = "";
                remainingAttempts--;

                if (word === selectedWord) {
                    wordToDisplay = "<b>" + word + "</b>";
                    row = "🟩🟩🟩🟩🟩";
                    victory = true;
                }
                else {
                    for (let i = 0; i < word.length; i++) {
                        if (word[i] === selectedWord[i]) {
                            wordToDisplay += "<b>" + word[i] + "</b>";
                            row += "🟩";
                        }
                        else if (letterInWord(word[i], selectedWord)) {
                            wordToDisplay += "<i>" + word[i] + "</i>";
                            row += "🟨";
                        }
                        else {
                            wordToDisplay += "<s>" + word[i] + "</s>";
                            row += "⬜️";
                        }
                    }
                }

                display[count] = wordToDisplay.toUpperCase();
                graph[count++] = row;

                return true;
            }
            else {
                return false;
            }
        },
        display: () => {
            return display;
        },
        graph: () => {
            return graph;
        },
        status: () => {
            return remainingAttempts > 0 || !victory;
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
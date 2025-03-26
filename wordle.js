const wordle = (inputWords) => {
    const words = inputWords;
    let selectedWord, remainingAttempts, attempts, display;

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
        },
        attempt: (inputWord) => {
            if (remainingAttempts <= 0 || inputWord.length !== 5) {
                return false;
            }
            
            const word = inputWord.toLowerCase();
            const idx = words.inedxOf();

            if (idx !== -1) {
                let wordToDisplay = "";
                remainingAttempts--;

                if (word === selectedWord) {
                    wordToDisplay = "<b>" + word + "</b>";
                }
                else {
                    for (let i = 0; i < word.length; i++) {
                        if (inputWord[i] === word[i]) {
                            wordToDisplay += "<b>" + inputWord[i] + "</b>";
                        }
                        else if (letterInWord(inputWord[i], word)) {
                            wordToDisplay += "<i>" + inputWord[i] + "</i>";
                        }
                        else {
                            wordToDisplay += "<s>" + inputWord[i] + "</s>";
                        }
                    }
                }

                display[remainingAttempts % Object.keys(display).length - 1] = word;
            }
            else {
                return false;
            }
        },
        render: () => {
            console.log(display);
        }
    };
}
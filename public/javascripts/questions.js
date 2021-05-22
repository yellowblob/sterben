const originalCodewords = [65, 38, 38, 86, 38, 226, 87, 230, 55, 54, 54, 246, 87, 208, 34, 236, 215, 17, 55, 236, 70, 17, 87, 236, 38, 17, 80, 90, 82, 71, 134, 226, 179, 83, 132, 51, 107, 95, 125, 216, 198, 238, 106, 34, 40, 47, 85, 13, 157, 93, 160, 80, 79, 65, 142, 140, 108, 175, 90, 103, 120, 110, 35, 177, 126, 14, 65, 77, 111, 223];

const questions = [
    "Wissen Sie schon, welche Art von Bestattung, Sie sich wünschen? Sarg, Urne oder Körperspende?",
    "Wenn Feuerbestattung, dann:",
    "Wie wollen Sie angekleidet und gewaschen werden?",
    "Welche Kleidung soll Ihre letzte sein?",
    "Wünschen Sie eine Aufbahrung?",
    "Welcher Sarg? Oder welche Urne?",
    "Wer soll das letzte Wort haben?",
    "Wollen Sie eine Traueranzeige veröffentlichen?",
    "Wenn ja, in welcher Zeitung?",
    "Wie groß (in cm)?",
    "Wie wird die Musik dargeboten?",
    "Welche Musik soll an Ihrer Beerdigung gespielt werden?",
    "Was gibt es zum Leichenschmaus?",
    "Wie viele Gäste?",
    "Wer kümmert sich um dei Grabpflege?",
    "Sterben Sie zu Hause oder im Krankenhaus?",
    "In welcher Jahreszeit sterben Sie?"
]

const answers = [
    [{
            "short": "1a",
            "text": "Erdbestattung auf dem Friedhof",
            "price": 2300,
        },
        {
            "short": "1b",
            "text": "Feuerbestattung",
            "price": 440,
        },
        {
            "short": "1c",
            "text": "Spende an Ausstellung „Körperwelten“",
            "price": 0
        }
    ],
    [{
            "short": "1d",
            "text": "auf dem Friedhof",
            "price": 2300,
        },
        {
            "short": "1e",
            "text": "im Friedwald",
            "price": 1000,
        },
        {
            "short": "1f",
            "text": "zur See",
            "price": 1000,
        },
        {
            "short": "1g",
            "text": "auf der Almwiese (Schweiz)",
            "price": 1000,
        },
        {
            "short": "1h",
            "text": "als Diamant",
            "price": 64500,
        },
        {
            "short": "1i",
            "text": "auf der Streuwiese",
            "price": 1500,
        },
        {
            "short": "1j",
            "text": "im Fluss (Holland)",
            "price": 2000,
        },
        {
            "short": "1k",
            "text": "aus dem Heißluftballon (Elsaß)",
            "price": 1800,
        },
        {
            "short": "1l",
            "text": "anonym",
            "price": 1800,
        }
    ],
    [{
            "short": "2a",
            "text": "Einkleidung, Waschung: Bestattungsunternehmen",
            "price": 200,
        },
        {
            "short": "2b",
            "text": "Einkleidung, Waschung: Freund:innen und Familie",
            "price": 0,
        },
        {
            "short": "2c",
            "text": "Einkleidung, Waschung: Bestattungsunternehmen + Familie und Freund:innen",
            "price": 200,
        }
    ],
    [{
            "short": "3a",
            "text": "Totengewand: eigene Kleidung",
            "price": 0,
        },
        {
            "short": "3b",
            "text": "Totengewand: das letzte Hemd",
            "price": 359,
        }
    ],
    [{
            "short": "4a",
            "text": "Aufbahrung",
            "price": 125,
        },
        {
            "short": "4b",
            "text": "nein",
            "price": 0,
        }
    ],
    [{
            "short": "5a",
            "text": "Sarg Mahagoni",
            "price": 1900,
        },
        {
            "short": "5b",
            "text": "Sarg Wildeiche",
            "price": 2100,
        },
        {
            "short": "5c",
            "text": "Truhe modern",
            "price": 1650,
        },
        {
            "short": "5d",
            "text": "Pilzsarg",
            "price": 600,
        },
        {
            "short": "5e",
            "text": "Urne Fußball",
            "price": 295,
        },
        {
            "short": "5f",
            "text": "Urne Birke",
            "price": 395,
        },
        {
            "short": "5g",
            "text": "Urne Swarowski",
            "price": 5000,
        },
        {
            "short": "5h",
            "text": "Filz- oder Häkelurne à la Mielich",
            "price": 27,
        }
    ],
    [{
            "short": "6a",
            "text": "Trauerredner:in",
            "price": 350,
        },
        {
            "short": "6b",
            "text": "Trauerrede: Pfarrer:in (evangelisch)",
            "price": 0,
        },
        {
            "short": "6c",
            "text": "Trauerrede: Pfarrer (katholisch), Taxi",
            "price": 70,
        },
        {
            "short": "6d",
            "text": "Trauerrede: Imam",
            "price": 0,
        },
        {
            "short": "6e",
            "text": "Trauerrede: Rabbi",
            "price": 0,
        },
        {
            "short": "6f",
            "text": "Trauerrede: Zugehörigenkreis",
            "price": 0,
        }
    ],
    [{
            "short": "7a",
            "text": "Ja",
            "price": 0,
        },
        {
            "short": "7b",
            "text": "Nein",
            "price": 0,
        }
    ],
    [{
            "short": "8a",
            "text": "Traueranzeige in der ZEIT",
            "price": 8.93,
        },
        {
            "short": "8b",
            "text": "Traueranzeige in der Süddeutschen Zeitung",
            "price": 4.76,
        },
        {
            "short": "8c",
            "text": "Traueranzeige in der Frankfurter Allgemeinen Zeitung",
            "price": 6.43,
        },
        {
            "short": "8d",
            "text": "Traueranzeige in einer Regionalzeitung",
            "price": 2.73,
        }
    ],
    [{
            "short": "9a",
            "text": ", 28 x 21cm",
            "price": 1260,
        },
        {
            "short": "9b",
            "text": ", 14 x 15cm",
            "price": 450,
        },
        {
            "short": "9c",
            "text": ", 4,5 x 5cm",
            "price": 50,
        }
    ],
    [{
            "short": "10a",
            "text": "Bluetooth-Box spielt",
            "price": 125,
        },
        {
            "short": "10b",
            "text": "Streichquartett mit",
            "price": 800,
        },
        {
            "short": "10c",
            "text": "Orgel mit",
            "price": 125,
        },
        {
            "short": "10d",
            "text": "Sänger:in mit",
            "price": 250,
        }
    ],
    [{
            "short": "11a",
            "text": "Chaconne (J.S. Bach)",
            "price": 0,
            "id": "zNs98hh_v9g",
        },
        {
            "short": "11b",
            "text": "Hallelujah (Leonard Cohen)",
            "price": 0,
            "id": "VK5V_EzGMzE",
        },
        {
            "short": "11c",
            "text": "Ain’t got no, I got life (Nina Simone)",
            "price": 0,
            "id": "giFPrv0DwOA",
        },
        {
            "short": "11d",
            "text": "Leylim Ley (Zülfü Livaneli)",
            "price": 0,
            "id": "u1yiwaFQf70",
        },
        {
            "short": "11e",
            "text": "I remember you (Björk)",
            "price": 0,
            "id": "YTeP5UVtvrc",
        }
    ],
    [{
            "short": "12a",
            "text": "Belegte Brötchen + Kaffee und Kuchen",
            "price": 19,
        },
        {
            "short": "12b",
            "text": "Antipasti",
            "price": 35,
        },
        {
            "short": "12c",
            "text": "Sterneküche",
            "price": 50,
        }
    ],
    [{
            "short": "13a",
            "text": "für 5 Gäste",
            "price": 5,
        },
        {
            "short": "13b",
            "text": "für 50 Gäste",
            "price": 50,
        },
        {
            "short": "13c",
            "text": "für 150 Gäste",
            "price": 150,
        },
        {
            "short": "13d",
            "text": "für 500 Gäste",
            "price": 500,
        }
    ],
    [{
            "short": "14a",
            "text": "Grapflege durch Professionelle Gärtnerei",
            "price": 9500,
        },
        {
            "short": "14b",
            "text": "Grapflege durch Zugehörigenkreis",
            "price": 1600,
        },
        {
            "short": "14c",
            "text": "Keine Grabpflege",
            "price": 0,
        }
    ],
    [{
            "short": "15a",
            "text": "Transport ab Haus / Wohnung",
            "price": 200,
        },
        {
            "short": "15b",
            "text": "Transport ab Krankenhaus",
            "price": 30,
        }
    ],
    [{
            "short": "16a",
            "text": "Blumenkranz mit Gladiolen",
            "price": 300,
        },
        {
            "short": "16b",
            "text": "Blumenkranz mit Rosen",
            "price": 300,
        },
        {
            "short": "16c",
            "text": "Blumenkranz mit Sonnenblumen",
            "price": 300,
        },
        {
            "short": "16d",
            "text": "Blumenkranz mit Protea",
            "price": 300,
        }
    ],
]

const answerMap = {
    "21_6": [0, 0],
    "21_5": [0, 1],
    "13_6": [0, 2],
    "13_5": [1, 0],
    "21_4": [1, 1],
    "21_3": [1, 2],
    "14_1": [1, 3],
    "14_0": [1, 4],
    "13_3": [1, 5],
    "21_1": [1, 6],
    "14_3": [1, 7],
    "14_2": [1, 8],
    "5_3": [2, 0],
    "5_2": [2, 1],
    "5_4": [2, 2],
    "4_2": [3, 0],
    "4_0": [3, 1],
    "20_5": [4, 0],
    "14_7": [4, 1],
    "12_5": [5, 0],
    "12_4": [5, 1],
    "12_2": [5, 2],
    "6_3": [5, 3],
    "6_2": [5, 4],
    "6_4": [5, 5],
    "3_3": [5, 6],
    "3_2": [5, 7],
    "2_7": [6, 0],
    "2_6": [6, 1],
    "2_5": [6, 2],
    "2_4": [6, 3],
    "2_3": [6, 4],
    "2_1": [6, 5],
    "20_2": [7, 0],
    "20_0": [7, 1],
    "15_7": [8, 0],
    "19_3": [8, 1],
    "16_1": [8, 2],
    "19_1": [8, 3],
    "11_4": [9, 0],
    "7_1": [9, 1],
    "11_2": [9, 2],
    "29_3": [10, 0],
    "18_5": [10, 1],
    "29_5": [10, 2],
    "18_4": [10, 3],
    "8_1": [11, 0],
    "8_0": [11, 1],
    "8_2": [11, 2],
    "8_5": [11, 3],
    "8_4": [11, 4],
    "9_1": [12, 0],
    "10_4": [12, 1],
    "9_3": [12, 2],
    "16_4": [13, 0],
    "16_6": [13, 1],
    "17_0": [13, 2],
    "17_2": [13, 3],
    "10_0": [14, 0],
    "9_7": [14, 1],
    "9_6": [14, 2],
    "0_2": [15, 0],
    "0_0": [15, 1],
    "1_4": [16, 0],
    "1_2": [16, 1],
    "1_0": [16, 2],
    "0_6": [16, 3]
}

let sorter = 0;
const maxMappingErrors = 5;

answers.forEach((question) => {
    question.forEach((answer) => {
        answer.sortingIndex = sorter;
        sorter++;
    });
});

function getFlippedBits(originalCodewords, scannedCodewords) {
    let flippedWords = [];
    for (let i = 0; i < originalCodewords.length; i++) {
        flippedWords[i] = originalCodewords[i] ^ scannedCodewords[i];
    }
    return flippedWords;
}

function getAnswers(scannedCodewords) {
    let mappingErrors = 0;
    let answerWords = getFlippedBits(originalCodewords, scannedCodewords);
    let choices = [];
    for (let i = 0; i < 30; i++) {
        const b = byte2bits(answerWords[i]);
        for (let j = 0; j < b.length; j++) {
            if (b[j] === "1") {
                const address = String(i) + "_" + String(j);
                try {
                    console.log("Detection on " + address);
                    const x = answerMap[address][0];
                    const y = answerMap[address][1];
                    const answer = {
                        "question": questions[x],
                        "answer": answers[x][y]
                    }
                    choices.push(answer);
                } catch (e) {
                    console.log("Error on " + address + " ,answerWords: " + byte2bits(answerWords[i]) + " ,scanned: " + byte2bits(scannedCodewords[i]) + " ,original: " + byte2bits(originalCodewords[i]));
                    mappingErrors++;
                }

            }
        }
    }
    if (mappingErrors > maxMappingErrors) {
        return null;
    }
    choices.sort((a, b) => (a.answer.sortingIndex > b.answer.sortingIndex) ? 1 : -1);

    let newspaper = false;
    let occurances = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let allowedMax = [2, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1];
    let allowedMin = [1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1];

    choices.forEach((choice)=>{
        let questionIndex = parseInt(choice.answer.short.replace(/[a-z]/g, ''));
        let questionChar = choice.answer.short.replace(/[0-9]/g, '');
        if(questionIndex === 7 && questionChar === 'a'){
            newspaper = true;
        }
        occurances[questionIndex-1]++;
    });
    
    let validation = true;

    if((occurances[7] === 0 || occurances[8] === 0) && newspaper){
        validation = false;
    }

    occurances.forEach((occurance, index)=>{
        if(occurance > allowedMax[index] || occurance < allowedMin[index]){
            validation = false;
        }
    });

    if(!validation)
        return null;

    
    return choices;
}

function byte2bits(a) {
    var tmp = "";
    for (var i = 128; i >= 1; i /= 2)
        tmp += a & i ? '1' : '0';
    return tmp;
}

export { getAnswers };
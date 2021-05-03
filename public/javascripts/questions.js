const originalCodewords = [65, 38, 38, 86, 38, 226, 87, 230, 55, 54, 54, 246, 87, 208, 34, 236, 215, 17, 55, 236, 70, 17, 87, 236, 38, 17, 80, 90, 82, 71, 134, 226, 179, 83, 132, 51, 107, 95, 125, 216, 198, 238, 106, 34, 40, 47, 85, 13, 157, 93, 160, 80, 79, 65, 142, 140, 108, 175, 90, 103, 120, 110, 35, 177, 126, 14, 65, 77, 111, 223];

const questions = [
    "Wissen Sie schon, welche Art von Bestattung, Sie sich wünschen? Urne, Sarg oder Körperspende?",
    "Wenn Kremation, dann:",
    "Wie wollen Sie angekleidet und gewaschen werden?",
    "Welche Kleidung soll Ihre letzte sein?",
    "Wünschen Sie eine Aufbahrung?",
    "Welcher Sarg? oder Welche Urne?",
    "Wollen Sie eine Traueranzeige veröffentlichen?",
    "Wenn ja",
    "Grösse: (cm)",
    "Trauerredner:in oder Pfarrer:in - katholisch oder evangelisch? muslimisch? jüdisch?",
    "Wie wird die Musik dargeboten?",
    "Welche Musik soll an Ihrer Beerdigung gespielt werden?",
    "Leichenschmaus. Welche Geschmacksrichtung?",
    "Wie viele Gäste?",
    "Grabpflege",
    "Sterben Sie zu Hause oder im Krankenhaus?",
    "In welcher Jahreszeit sterben Sie?"
]

const answers = [
    [{
            "short": "1a",
            "text": "Erdbestattung",
        },
        {
            "short": "1b",
            "text": "Feuerbestattung",
        },
        {
            "short": "1c",
            "text": "Ausstellung „Körperwelten“",
        }
    ],
    [{
            "short": "1.1a",
            "text": "Friedhof",
        },
        {
            "short": "1.1b",
            "text": "Friedwald",
        },
        {
            "short": "1.1c",
            "text": "Seebestattung",
        },
        {
            "short": "1.1d",
            "text": "Almwiesenbestattung (Schweiz)",
        },
        {
            "short": "1.1e",
            "text": "Diamantbestattung",
        },
        {
            "short": "1.1f",
            "text": "Streuwiesenbestattung",
        },
        {
            "short": "1.1g",
            "text": "Flussbestattung (Holland)",
        },
        {
            "short": "1.1h",
            "text": "Luftbestattung (mit Heißluftballon) (Elsaß)",
        },
        {
            "short": "1.1i",
            "text": "Anonyme Bestattung",
        }
    ],
    [{
            "short": "2a",
            "text": "Professionell von einem Bestattungsunternehmen",
        },
        {
            "short": "2b",
            "text": "Ganz persönlich von Freund:innen und Familie",
        },
        {
            "short": "2c",
            "text": "Bestattungsunternehmen gemeinsam mit Familie und Freund:innen",
        }
    ],
    [{
            "short": "3a",
            "text": "etwas eigenes",
        },
        {
            "short": "3b",
            "text": "Das letzte Hemd (kaufen)",
        }
    ],
    [{
            "short": "4a",
            "text": "ja",
        },
        {
            "short": "4b",
            "text": "nein",
        }
    ],
    [{
            "short": "5a",
            "text": "Mahagonisarg",
        },
        {
            "short": "5b",
            "text": "Wildeichesarg",
        },
        {
            "short": "5c",
            "text": "Truhe modern",
        },
        {
            "short": "5d",
            "text": "Pilzsarg",
        },
        {
            "short": "5e",
            "text": "Fußballurne",
        },
        {
            "short": "5f",
            "text": "Birkenurne",
        },
        {
            "short": "5g",
            "text": "Swarowski-Urne",
        },
        {
            "short": "5h",
            "text": "Häkelurne à la Mielich",
        }
    ],
    [{
            "short": "6a",
            "text": "Ja",
        },
        {
            "short": "6b",
            "text": "Nein",
        }
    ],
    [{
            "short": "7a",
            "text": "ZEIT",
        },
        {
            "short": "7b",
            "text": "Süddeutsche Zeitung",
        },
        {
            "short": "7c",
            "text": "Frankfurter Allgemeine Zeitung",
        },
        {
            "short": "7d",
            "text": "Regionale Zeitung",
        }
    ],
    [{
            "short": "8a",
            "text": "28 x 21 cm",
        },
        {
            "short": "8b",
            "text": "14 x 15 cm",
        },
        {
            "short": "8c",
            "text": "4,5 x 5 cm",
        }
    ],
    [{
            "short": "9a",
            "text": "Trauerredner:in",
        },
        {
            "short": "9b",
            "text": "Pfarrer:in (evangelisch)",
        },
        {
            "short": "9c",
            "text": "Pfarrer (katholisch)",
        },
        {
            "short": "9d",
            "text": "Imam",
        },
        {
            "short": "9e",
            "text": "Rabbi",
        },
        {
            "short": "9f",
            "text": "Sie zwingen jemanden aus der Familie, die Zeremonie zu gestalten",
        }
    ],
    [{
            "short": "10a",
            "text": "Mit Bluetooth-Box",
        },
        {
            "short": "10b",
            "text": "Mit Streichquartett",
        },
        {
            "short": "10c",
            "text": "Orgel",
        },
        {
            "short": "10d",
            "text": "Gesang",
        }
    ],
    [{
            "short": "11a",
            "text": "J.S. Bach - Chaconne",
        },
        {
            "short": "11b",
            "text": "Leonard Cohen - Hallelujah",
        },
        {
            "short": "11c",
            "text": "Nina Simone - Ain’t got no, I got life",
        },
        {
            "short": "11d",
            "text": "Zülfü Livaneli - Leylim Ley",
        },
        {
            "short": "11e",
            "text": "Björk - I remember you",
        }
    ],
    [{
            "short": "12a",
            "text": "Belegte Brötchen + Kaffee und Kuchen",
        },
        {
            "short": "12b",
            "text": "Antipasti",
        },
        {
            "short": "12c",
            "text": "Sterneküche",
        },
        {
            "short": "12d",
            "text": "Foodtruck",
        }
    ],
    [{
            "short": "13a",
            "text": "5",
        },
        {
            "short": "13b",
            "text": "50",
        },
        {
            "short": "13c",
            "text": "150",
        },
        {
            "short": "13d",
            "text": "500",
        }
    ],
    [{
            "short": "14a",
            "text": "Professionell",
        },
        {
            "short": "14b",
            "text": "Zugehörigenkreis",
        },
        {
            "short": "14c",
            "text": "keine",
        }
    ],
    [{
            "short": "15a",
            "text": "zu Hause",
        },
        {
            "short": "15b",
            "text": "Krankenhaus",
        }
    ],
    [{
            "short": "16a",
            "text": "Frühling",
        },
        {
            "short": "16b",
            "text": "Sommer",
        },
        {
            "short": "16c",
            "text": "Herbst",
        },
        {
            "short": "16d",
            "text": "Winter",
        }
    ],
]

const answerMap = {
    "0_0": [0, 0],
    "0_2": [0, 1],
    "0_5": [0, 2],
    "0_6": [1, 0],
    "1_0": [1, 1],
    "1_2": [1, 2],
    "1_3": [1, 3],
    "1_4": [1, 4],
    "2_1": [1, 5],
    "2_3": [1, 6],
    "2_4": [1, 7],
    "2_5": [1, 8],
    "2_6": [2, 0],
    "2_7": [2, 1],
    "3_0": [2, 2],
    "3_2": [3, 0],
    "3_3": [3, 1],
    "3_7": [4, 0],
    "4_0": [4, 1],
    "4_2": [5, 0],
    "4_3": [5, 1],
    "4_4": [5, 2],
    "9_6": [5, 3],
    "9_7": [5, 4],
    "9_4": [5, 5],
    "9_3": [5, 6],
    "9_1": [5, 7],
    "8_4": [6, 0],
    "8_5": [6, 1],
    "8_2": [7, 0],
    "8_0": [7, 1],
    "8_1": [7, 2],
    "7_3": [7, 3],
    "7_1": [8, 0],
    "6_6": [8, 1],
    "6_4": [8, 2],
    "6_2": [9, 0],
    "6_3": [9, 1],
    "5_7": [9, 2],
    "5_4": [9, 3],
    "5_2": [9, 4],
    "5_3": [9, 5],
    "10_0": [10, 0],
    "10_2": [10, 1],
    "10_4": [10, 2],
    "11_1": [10, 3],
    "11_2": [11, 0],
    "11_4": [11, 1],
    "12_2": [11, 2],
    "12_4": [11, 3],
    "12_5": [11, 4],
    "12_6": [12, 0],
    "13_2": [12, 1],
    "13_3": [12, 2],
    "13_5": [12, 3],
    "17_2": [13, 0],
    "17_0": [13, 1],
    "16_6": [13, 2],
    "16_4": [13, 3],
    "16_2": [14, 0],
    "16_1": [14, 1],
    "15_7": [14, 2],
    "15_0": [15, 0],
    "14_7": [15, 1],
    "14_4": [16, 0],
    "14_2": [16, 1],
    "14_3": [16, 2],
    "14_0": [16, 3]
}

let sorter = 0;
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
    let answerWords = getFlippedBits(originalCodewords, scannedCodewords);
    let choices = [];
    for (let i = 0; i < 18; i++) {
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
                    return null;
                }

            }
        }
    }
    if (choices.length < 14) {
        return null;
    }
    choices.sort((a, b) => (a.answer.sortingIndex > b.answer.sortingIndex) ? 1 : -1);
    return choices;
}

function byte2bits(a) {
    var tmp = "";
    for (var i = 128; i >= 1; i /= 2)
        tmp += a & i ? '1' : '0';
    return tmp;
}

export { getAnswers };
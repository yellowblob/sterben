const originalCodewords = [65, 38, 38, 86, 38, 226, 87, 230, 55, 54, 54, 246, 87, 208, 34, 236, 215, 17, 55, 236, 70, 17, 87, 236, 38, 17, 80, 90, 82, 71, 134, 226, 179, 83, 132, 51, 107, 95, 125, 216, 198, 238, 106, 34, 40, 47, 85, 13, 157, 93, 160, 80, 79, 65, 142, 140, 108, 175, 90, 103, 120, 110, 35, 177, 126, 14, 65, 77, 111, 223];

const questions = [
    "Wissen Sie schon, welche Art von Bestattung, Sie sich wünschen? Sarg, Urne oder Körperspende?",
    "Wenn Feuerbestattung, dann:",
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
            "price": 2000,
        },
        {
            "short": "1b",
            "text": "Feuerbestattung",
            "price": 1000,
        },
        {
            "short": "1c",
            "text": "Ausstellung „Körperwelten“",
            "price": 0
        }
    ],
    [{
            "short": "1.1a",
            "text": "Friedhof",
            "price": 300,
        },
        {
            "short": "1.1b",
            "text": "Friedwald",
            "price": 500,
        },
        {
            "short": "1.1c",
            "text": "Seebestattung",
            "price": 1000,
        },
        {
            "short": "1.1d",
            "text": "Almwiesenbestattung (Schweiz)",
            "price": 1000,
        },
        {
            "short": "1.1e",
            "text": "Diamantbestattung",
            "price": 3000,
        },
        {
            "short": "1.1f",
            "text": "Streuwiesenbestattung",
            "price": 1500,
        },
        {
            "short": "1.1g",
            "text": "Flussbestattung (Holland)",
            "price": 2000,
        },
        {
            "short": "1.1h",
            "text": "Luftbestattung (mit Heißluftballon) (Elsaß)",
            "price": 750,
        },
        {
            "short": "1.1i",
            "text": "Anonyme Bestattung",
            "price": 30,
        }
    ],
    [{
            "short": "2a",
            "text": "Professionell von einem Bestattungsunternehmen",
            "price": 500,
        },
        {
            "short": "2b",
            "text": "Ganz persönlich von Freund:innen und Familie",
            "price": 1000,
        },
        {
            "short": "2c",
            "text": "Bestattungsunternehmen gemeinsam mit Familie und Freund:innen",
            "price": 400,
        }
    ],
    [{
            "short": "3a",
            "text": "etwas eigenes",
            "price": 300,
        },
        {
            "short": "3b",
            "text": "Das letzte Hemd (kaufen)",
            "price": 450,
        }
    ],
    [{
            "short": "4a",
            "text": "ja",
            "price": 400,
        },
        {
            "short": "4b",
            "text": "nein",
            "price": 600,
        }
    ],
    [{
            "short": "5a",
            "text": "Mahagonisarg",
            "price": 3000,
        },
        {
            "short": "5b",
            "text": "Wildeichesarg",
            "price": 4000,
        },
        {
            "short": "5c",
            "text": "Truhe modern",
            "price": 4500,
        },
        {
            "short": "5d",
            "text": "Pilzsarg",
            "price": 600,
        },
        {
            "short": "5e",
            "text": "Fußballurne",
            "price": 450,
        },
        {
            "short": "5f",
            "text": "Birkenurne",
            "price": 600,
        },
        {
            "short": "5g",
            "text": "Swarowski-Urne",
            "price": 1000,
        },
        {
            "short": "5h",
            "text": "Häkelurne à la Mielich",
            "price": 400,
        }
    ],
    [{
            "short": "6a",
            "text": "Ja",
            "price": 700,
        },
        {
            "short": "6b",
            "text": "Nein",
            "price": 950,
        }
    ],
    [{
            "short": "7a",
            "text": "ZEIT",
            "price": 100,
        },
        {
            "short": "7b",
            "text": "Süddeutsche Zeitung",
            "price": 150,
        },
        {
            "short": "7c",
            "text": "Frankfurter Allgemeine Zeitung",
            "price": 200,
        },
        {
            "short": "7d",
            "text": "Regionale Zeitung",
            "price": 50,
        }
    ],
    [{
            "short": "8a",
            "text": "28 x 21 cm",
            "price": 56,
        },
        {
            "short": "8b",
            "text": "14 x 15 cm",
            "price": 28,
        },
        {
            "short": "8c",
            "text": "4,5 x 5 cm",
            "price": 59,
        }
    ],
    [{
            "short": "9a",
            "text": "Trauerredner:in",
            "price": 300,
        },
        {
            "short": "9b",
            "text": "Pfarrer:in (evangelisch)",
            "price": 0,
        },
        {
            "short": "9c",
            "text": "Pfarrer (katholisch)",
            "price": 0,
        },
        {
            "short": "9d",
            "text": "Imam",
            "price": 0,
        },
        {
            "short": "9e",
            "text": "Rabbi",
            "price": 0,
        },
        {
            "short": "9f",
            "text": "Sie zwingen jemanden aus der Familie, die Zeremonie zu gestalten",
            "price": 0,
        }
    ],
    [{
            "short": "10a",
            "text": "Mit Bluetooth-Box",
            "price": 0,
        },
        {
            "short": "10b",
            "text": "Mit Streichquartett",
            "price": 1000,
        },
        {
            "short": "10c",
            "text": "Orgel",
            "price": 50,
        },
        {
            "short": "10d",
            "text": "Gesang",
            "price": 250,
        }
    ],
    [{
            "short": "11a",
            "text": "J.S. Bach - Chaconne",
            "price": 10,
            "id": "132689716",
        },
        {
            "short": "11b",
            "text": "Leonard Cohen - Hallelujah",
            "price": 10,
            "id": "402902131",
        },
        {
            "short": "11c",
            "text": "Nina Simone - Ain’t got no, I got life",
            "price": 10,
            "id": "188080842",
        },
        {
            "short": "11d",
            "text": "Zülfü Livaneli - Leylim Ley",
            "price": 10,
            "id": "9387983",
        },
        {
            "short": "11e",
            "text": "Björk - I remember you",
            "price": 10,
            "id": "68675931",
        }
    ],
    [{
            "short": "12a",
            "text": "Belegte Brötchen + Kaffee und Kuchen",
            "price": 200,
        },
        {
            "short": "12b",
            "text": "Antipasti",
            "price": 300,
        },
        {
            "short": "12c",
            "text": "Sterneküche",
            "price": 1000,
        },
        {
            "short": "12d",
            "text": "Foodtruck",
            "price": 500,
        }
    ],
    [{
            "short": "13a",
            "text": "5",
            "price": 100,
        },
        {
            "short": "13b",
            "text": "50",
            "price": 1000,
        },
        {
            "short": "13c",
            "text": "150",
            "price": 3000,
        },
        {
            "short": "13d",
            "text": "500",
            "price": 10000,
        }
    ],
    [{
            "short": "14a",
            "text": "Professionell",
            "price": 1000,
        },
        {
            "short": "14b",
            "text": "Zugehörigenkreis",
            "price": 0,
        },
        {
            "short": "14c",
            "text": "keine",
            "price": 0,
        }
    ],
    [{
            "short": "15a",
            "text": "zu Hause",
            "price": 1000,
        },
        {
            "short": "15b",
            "text": "Krankenhaus",
            "price": 500,
        }
    ],
    [{
            "short": "16a",
            "text": "Frühling",
            "price": 10,
        },
        {
            "short": "16b",
            "text": "Sommer",
            "price": 20,
        },
        {
            "short": "16c",
            "text": "Herbst",
            "price": 30,
        },
        {
            "short": "16d",
            "text": "Winter",
            "price": 40,
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
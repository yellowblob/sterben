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
            "short": "01a",
        },
        {
            "short": "01b",
        },
        {
            "short": "01c",
        }
    ],
    [{
            "short": "01.1a",
        },
        {
            "short": "01.1b",
        },
        {
            "short": "01.1c",
        },
        {
            "short": "01.1d",
        },
        {
            "short": "01.1e",
        },
        {
            "short": "01.1f",
        },
        {
            "short": "01.1g",
        },
        {
            "short": "01.1h",
        },
        {
            "short": "01.1i",
        }
    ],
    [{
            "short": "02a",
        },
        {
            "short": "02b",
        },
        {
            "short": "02c",
        }
    ],
    [{
            "short": "03a",
        },
        {
            "short": "03b",
        }
    ],
    [{
            "short": "04a",
        },
        {
            "short": "04b",
        }
    ],
    [{
            "short": "05a",
        },
        {
            "short": "05b",
        },
        {
            "short": "05c",
        },
        {
            "short": "05d",
        },
        {
            "short": "05e",
        },
        {
            "short": "05f",
        },
        {
            "short": "05g",
        },
        {
            "short": "05h",
        }
    ],
    [{
            "short": "06a",
        },
        {
            "short": "06b",
        }
    ],
    [{
            "short": "07a",
        },
        {
            "short": "07b",
        },
        {
            "short": "07c",
        },
        {
            "short": "07d",
        }
    ],
	[{
            "short": "08a",
        },
        {
            "short": "08b",
        },
        {
            "short": "08c",
        }
    ],
    [{
            "short": "09a",
        },
        {
            "short": "09b",
        },
        {
            "short": "09c",
        },
        {
            "short": "09d",
        },
        {
            "short": "09e",
        },
        {
            "short": "09f",
        }
    ],
    [{
            "short": "10a",
        },
        {
            "short": "10b",
        },
        {
            "short": "10c",
        },
        {
            "short": "10d",
        }
    ],
    [{
            "short": "11a",
        },
        {
            "short": "11b",
        },
        {
            "short": "11c",
        },
        {
            "short": "11d",
        },
        {
            "short": "11e",
        }
    ],
    [{
            "short": "12a",
        },
        {
            "short": "12b",
        },
        {
            "short": "12c",
        },
        {
            "short": "12d",
        }
    ],
    [{
            "short": "13a",
        },
        {
            "short": "13b",
        },
        {
            "short": "13c",
        },
        {
            "short": "13d",
        }
    ],
    [{
            "short": "14a",
        },
        {
            "short": "14b",
        },
        {
            "short": "14c",
        }
    ],
    [{
            "short": "15a",
        },
        {
            "short": "15b",
        }
    ],
    [{
            "short": "16a",
        },
        {
            "short": "16b",
        },
        {
            "short": "16c",
        },
        {
            "short": "16d",
        }
    ],
]

const answerMap = {
	"0_0": [0,0],
	"0_2": [0,1],
	"0_5": [0,2],
	"0_6": [1,0],
	"1_0": [1,1],
	"1_2": [1,2],
	"1_3": [1,3],
	"1_4": [1,4],
	"2_1": [1,5],
	"2_3": [1,6],
	"2_4": [1,7],
	"2_5": [1,8],
	"2_6": [2,0],
	"2_7": [2,1],
	"3_0": [2,2],
	"3_2": [3,0],
	"3_3": [3,1],
	"3_7": [4,0],
	"4_0": [4,1],
	"4_2": [5,0],
	"4_3": [5,1],
	"4_4": [5,2],
	"9_6": [5,3],
	"9_7": [5,4],
	"9_4": [5,5],
	"9_3": [5,6],
	"9_1": [5,7],
	"8_4": [6,0],
	"8_5": [6,1],
	"8_2": [7,0],
	"8_0": [7,1],
	"8_1": [7,2],
	"7_3": [7,3],
	"7_1": [8,0],
	"6_6": [8,1],
	"6_4": [8,2],
	"6_2": [9,0],
	"6_3": [9,1],
	"5_7": [9,2],
	"5_4": [9,3],
	"5_2": [9,4],
	"5_3": [9,5],
	"10_0": [10,0],
	"10_2": [10,1],
	"10_4": [10,2],
	"11_1": [10,3],
	"11_2": [11,0],
	"11_4": [11,1],
	"12_2": [11,2],
	"12_4": [11,3],
	"12_5": [11,4],
	"12_6": [12,0],
	"13_2": [12,1],
	"13_3": [12,2],
	"13_5": [12,3],
	"17_2": [13,0],
	"17_0": [13,1],
	"16_6": [13,2],
	"16_4": [13,3],
	"16_2": [14,0],
	"16_1": [14,1],
	"15_7": [14,2],
	"15_0": [15,0],
	"14_7": [15,1],
	"14_4": [16,0],
	"14_2": [16,1],
	"14_3": [16,2],
	"14_0": [16,3] 
}

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
                	choices.push(answers[x][y]);
            	} catch(e) {
            		console.log("Error on " + address + " ,answerWords: " + byte2bits(answerWords[i]) + " ,scanned: " + byte2bits(scannedCodewords[i]) + " ,original: " + byte2bits(originalCodewords[i]));
            		return null;
            	}
            	
            }
        }
    }
    if (choices.length < 14) {
    	return null;
    }
    choices.sort((a, b) => (a.short > b.short) ? 1 : -1);
    return choices;
}

function byte2bits(a)
{
    var tmp = "";
    for(var i = 128; i >= 1; i /= 2)
        tmp += a&i?'1':'0';
    return tmp;
}

export { getAnswers };
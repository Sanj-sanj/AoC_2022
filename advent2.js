const fs = require('fs')



function parseInput(data) {
    let matchPoints = {
        Z: 6, // win
        Y: 3, // draw
        X: 0, // lose
    }
    let choicePoints = {
        R: 1,
        P: 2,
        S: 3,
    }
    let combinations = {
        "A X": "S",
        "A Y": "R",
        "A Z": "P",
        "B X": "R",
        "B Y": "P",
        "B Z": "S",
        "C X": "P",
        "C Y": "S",
        "C Z": "R",
    }
    let matches = data.split('\n');
    let sum = 0;
    for (const match of matches) {
        if (match !== "") {
            sum += choicePoints[combinations[match]];
            sum += matchPoints[match[2]];
        }
    }
    console.log(sum);
}


function parse(data) {

    const solutions = {
        "A X" : 1 + 3,
        "A Y" : 2 + 6,
        "A Z" : 3 + 0,
        "B X" : 1 + 0,
        "B Y" : 2 + 3,
        "B Z" : 3 + 6,
        "C X" : 1 + 6,
        "C Y" : 2 + 0,
        "C Z" : 3 + 3,
    }
    SCORES_2 = {
        'A X': 0+3,
        'A Y': 3+1,
        'A Z': 6+2,
        'B X': 0+1,
        'B Y': 3+2,
        'B Z': 6+3,
        'C X': 0+2,
        'C Y': 3+3,
        'C Z': 6+1
    }


    let sum = 0
    const matches = data.split('\n')
    for(let line of matches) {
        if(line !== '') {
            sum += SCORES_2[line]
            // sum += solutions[line]
            // console.log(line.slice(-1))
            // sum += matchResult[line.slice(-1)]
        }
    }
    return sum
}

function readLegend () {
    try {
        const data = fs.readFileSync('./adventDay2', 'utf-8')
        return parse(data)   
    } catch (error) {
        if(err) {
            console.error(err)
            return;
        }}

    }

    function mock() {
        const temp = `A Y
B X
C Z`
        return parse(temp)
    }

    console.log(
        // mock()
        readLegend()
    )
const { readFileSync } = require('fs')

const mockData = `30373
25512
65332
33549
35390`

function readInput(mockOn) {
    try {
        if(mockOn) return checkVis(mockData.split('\n'))
        const data = readFileSync('day8.txt', 'utf-8')
        return checkVis(data.split('\n'))
    } catch (error) {
    console.error(error)        
    }
}

function checkNumberRightToLeft(row, pos) {
    let predicate = row[pos], isVisible = true, viewScore = 0;
    for (let i = pos; i < row.length; i++) {
        if(!row[i + 1]) break;
        viewScore++
        if(i === row.length - 1) continue;
        if(row[i + 1] < predicate) isVisible = true
        else {
            isVisible = false; 
            break;
        }
    }
    return [isVisible, viewScore]
}

function checkVis(data) {
    let visible = 0;
    const xYCompass = {}
    const scores = [];
    for (let y = 0; y < data.length; y++) {
        if(y === 0 || y === data.length - 1) {
            visible += data[y].length
            continue;
        }
        [...data[y]].map((num,x, arr) => {
            //crawl all the way left and right then crawl all thw way up and down
            let right, left, top, bottom
            const col = data.reduce((acc,curr, i) => [...acc, curr[x]], [])
            if(x === 0 || x === arr.length - 1) {
                visible += 1
                return
            }
            const temp = [...arr].reverse()
            const tempX = arr.length - 1 - x
            const tempY = arr.length - 1 - y
            let [rightVisibility, rightScore] = checkNumberRightToLeft(arr, x, num)
            let [leftVisibility, leftScore] = checkNumberRightToLeft(temp, tempX, arr[arr.length - x])
            let [bottomVisibility, bottomScore] = checkNumberRightToLeft(col, y, num)
            let [topVisibility, topScore] = checkNumberRightToLeft([...col].reverse(), tempY, num)
            right = rightVisibility
            left = leftVisibility
            top = topVisibility
            bottom = bottomVisibility
            xYCompass[`${y},${x}`] = {right, left, top, bottom}
            scores.push(topScore * leftScore * bottomScore * rightScore)
        })
    }
    console.log('largest score: ',scores.sort((a,b) => b - a)[0])
    console.log("visible trees: ", Object.keys(xYCompass).reduce((acc,coord) => {
        Object.entries(xYCompass[coord]).some(tuple => tuple[1]) ? acc += 1: acc
        return acc
    }, visible))
}

readInput()
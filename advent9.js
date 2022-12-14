const { readFileSync } = require('fs')

const mockData = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

const mock2 = `R 4
U 4
L 3
D 3`
const mock3 = `L 4
D 4
R 3
U 3`

function readInput(mockOn) {
    try {
        if(mockOn) return trail(mock3.split('\n'))
        const data = readFileSync('day9.txt', 'utf-8')
        return trail(data.split('\n'))
    } catch (error) {
    console.error(error)        
}
}
const head = 'H'
const tail = 'T'
const fill = "*"
const map = [ [head] ]
let headX = 0, headY = 0;
let tailX = 0, tailY = 0;

function drawToConsole() {
    console.log(map.map(row => row.join(' ')).join('\n'))
    console.log(headY, headX)
    console.log(tailY, tailX)
}

function isTailAttached() {
    return headX - tailX >= 2 || headY - tailY >= 2 || headX - tailX <= -2 || headY - tailY <= -2 ? false : true;
}
function isDiagnoallyDetached() {
    // map[tailY][tailX] = fill;
    console.log({head: [headY,headX], tail: [tailY,tailX]})
    // if(  ) {
    //     console.log('DIAGNOAL RIGHT MISALIGNED')
    // } else if ( tailX - 2 === headY ) {
    //     console.log("DIAGNOAL LEFT MISALIGNED?")
    //     }
}
function moveTail() {
    if(headX - tailX === 2) {
        //R to L
        console.log('r to L')
        tailX++
    }    
    else if(headX - tailX === -2) {
        //L to R
        if(headY - tailY === 1) {console.log('shift down'); tailY++}
        if(headY - tailY === -1) console.log('shift up')
        console.log('R to L')
        tailX--
    }    
    else if(headY - tailY === 2) {
        // D to U 
        console.log('D to U')
        tailY++
        if(headX - tailX === 1) {console.log('shift Right'); tailX++}
        if(headX - tailY === -1) console.log('shift Left')
    }     
    else if(headY - tailY === -2) {
        console.log('U to D')
        if(tailX - headX === 1) {console.log('shift left'); tailX--}
        if(headX - tailY === -1) console.log('shift unkown')
        // U to D 
        tailY--
    }
    map[tailY][tailX] = tail     
    isDiagnoallyDetached()
}

function centerTail(tX, tY, hX, hY) {
    if(tailX === 0 && tailY === 0 && map[0][0] === '*') map[0][0] = tail 

    if(!isTailAttached()) {
        console.log('detached')
        // map[tailY][tailX] === fill
        // isDiagnoallyDetached()
        moveTail()
    }
}
function moveMarker([dir,n]) {
    //right
    console.log(dir, n)
    switch (dir) {
        case "R":
            for (headX; n > 0; n--) {
                map[headY][headX] = fill
                headX++
                map[headY][headX] = head
                centerTail(tailX, tailY, headX, headY)
                drawToConsole()
            }            
            break;
        case "U":
            for (headY ; n > 0; n--) {
                if(!map[headY + 1]) map.push(new Array(map[0].length).fill(fill))
                map[headY][headX] = fill
                headY++
                map[headY][headX] = head
                centerTail(tailX, tailY, headX, headY)
                drawToConsole()
            }
            break;
        case "L":
            for (headX; n > 0; n--) {
                if(!map[headY][headX - 1]){
                    map[headY].unshift(fill)
                    headX++
                }
                map[headY][headX] = fill
                headX--
                map[headY][headX] = head
                centerTail(tailX, tailY, headX, headY)
                drawToConsole()
            }            
            break;

            case "D":
                for (headY; n > 0; n--) {
                    if(!map[headY - 1]) {
                        map.unshift(new Array(map[headY].length).fill(fill))
                        headY++
                    }
                    map[headY][headX] = fill
                    headY--
                    map[headY][headX] = head
                    centerTail(tailX, tailY, headX, headY)
                    drawToConsole()
                }
                break;
    
        default:
            break;
    }

}

function trail(inputs) {
    for (const input of inputs) {
        moveMarker(input.split(' '))
    }
}

readInput(true)
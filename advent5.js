const {readFileSync} = require('fs')

const mockData = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

function readInput(mockOn) {
    try {
        if(mockOn) return seperateList(mockData)
        const data = readFileSync('supplyStacks.txt', 'utf-8')
        return seperateList(data)
    } catch (error) {
    console.error(error)        
    }
}

//splits the input from the supply stacks and the instructions for the crane
function seperateList(input) {
    return input.split('\n\n')
}


function groupStacks(topPart) {
    const stack = topPart.slice(0,-1).reverse()
    const labels = topPart[topPart.length - 1]
        .split(' ')
        .filter(s => s)
        .reduce((acc,curr) => ({...acc, [curr]: []}),{})
    stack.forEach((row) => {
        for (let i = 1, labelIndex = 1; i < row.length; i += 4, labelIndex++) {
            const element = row[i];
            element !== ' ' ? labels[labelIndex].push(element) : null
        }
    })
    return labels 
}

function moveStack(n, from, to, container) {
    if(n === 0) return 
    const box = container[from].pop()
    container[to].push(box)
    n--
    return moveStack(n, from, to, container)
}
function moveStack9001(n, from, to, container) {
    const boxes = container[from].splice(-n)
    container[to].push(...boxes)
}

function procedure(prompts, container) {
    const instructions = prompts.split('\n')    
    for(let line of instructions) {
        //value N, from X, to Y
        const [n,v,t] = line.split(' ').filter(v => +v)
        // moveStack(n,v,t, container)
        moveStack9001(n,v,t, container)
    }
}


function findLastItems(container) {
    return Object.keys(container).map(key => container[key].slice(-1)[0]).join('')
}

function initDay5() {
    const [top, bottom] = readInput() //input true for mock data
    const container = groupStacks(top.split('\n'))
    procedure(bottom, container)
    const lastBoxes = findLastItems(container)
    return lastBoxes
}
console.log(initDay5())    



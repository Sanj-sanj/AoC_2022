const { readFileSync } = require('fs')

const mockData = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`

function readInput(mockOn, windowSize) {
    try {
        if(mockOn) return slidingWindow(windowSize, mockData)
        const data = readFileSync('day6.txt', 'utf-8')
        return slidingWindow(windowSize, data)
    } catch (error) {
    console.error(error)        
    }
}

function slidingWindow(windowSize, inputData) {

    return [...inputData].reduce((acc,curr, i) => {
        if(acc.packetMarker) return acc
        if(acc.window.length !== windowSize) return {...acc, window: [...acc.window, curr]}
        if(new Set(acc.window).size === windowSize) return {...acc, packetMarker: i}
        return {prev : [...acc.prev, acc.window.shift()], window: [...acc.window, curr]}        
    }, {prev: [], window: [], packetMarker: undefined})
}
// console.log(readInput(true, 4))
console.log(readInput(false, 14))
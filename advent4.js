const fs = require('fs')

const mockData = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

function readInput(mockOn) {
    try {
        if(mockOn) return mockData
        const data = fs.readFileSync('sectionPairs.txt', 'utf-8')
        return data
    } catch (error) {
    console.error(error)        
    }
}

function sectionPairs(input) {
    const converted = input.split('\n')
    return converted.reduce((acc,curr) => {
        //  ["2-4", "6-8"] => [ [2,4], [6,8] ]
        const rangeTuple = curr.split(',').map(range => range.split('-').map(n => +n))
        // const overlap = checkOverLap(rangeTuple)
        const overlap = checkInclusion(rangeTuple)
        return [...acc, overlap]

    }, [])
}
function checkOverLap(tuplesArr) {
    const LtoR = comparator(tuplesArr[0], tuplesArr[1])
    const RtoL = comparator(tuplesArr[1], tuplesArr[0])
    if(LtoR || RtoL) return true;
    return false
}
    //  [ 2, 6 ], [ 4, 8 ] 
    // [ [ 4, 8 ], [ 2, 6 ] ]

function checkInclusion(tuplesArr) {
    const LtoR = comparatorInclusion(tuplesArr[0], tuplesArr[1])
    const RtoL = comparatorInclusion(tuplesArr[1], tuplesArr[0])
    if(LtoR || RtoL) return true;
    return false
}

function comparatorInclusion(tuple1,tuple2) {
    if(tuple1[1] >= tuple2[0] && tuple1[1] <= tuple2[1]) return true
    return false
}

function comparator(tuple1,tuple2) {
    if(tuple1[0] <= tuple2[0] && tuple1[1] >= tuple2[1]) return true
    return false
}

const data = readInput()

console.log(sectionPairs(data).filter(pairs => pairs).length)
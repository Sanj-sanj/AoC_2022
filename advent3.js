const { group } = require('console')
const fs = require('fs')

const mock = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`
const mock2 = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg`

function readInput (testFlag) {
    try {
        if(testFlag) {
            const data = mock
            return parse(data)       
        }
        const data = fs.readFileSync('./rucksack.txt', 'utf-8')
        return parse(data)   
    } catch (error) {
            console.error(error)
    }

}
const charCodeModifier = (n) => n >= 97 && n <= 122 ? n - 96 : n - 38

function dictionaryify([...line]) {
    let dict = {}
    line.forEach(char => {
        dict[char] = charCodeModifier(char.charCodeAt()) 
    } )
    return dict
}

function parse(data) {
    let temp = data.split('\n')
    const priorites = []
    const elfGroup = []
    const groups = []
    for(let line of temp) {
        const gift1 = line.slice(0, line.length / 2)
        const gift2 = line.slice(line.length / 2, )
        const dict1 = dictionaryify(gift1)
        const dict2 = dictionaryify(gift2)
        const dict3 = dictionaryify(line)
        elfGroup.push(dict3)
        if(elfGroup.length === 3) {
            groups.push(...Object.keys(elfGroup[0]).filter(key => Object.keys(elfGroup[1].concat(elfGroup[2])).includes(key)))
            elfGroup.length = 0
        }
        priorites.push(...Object.keys(dict1).filter(key => Object.keys(dict2).includes(key)))
    }
    return groups.reduce((acc,curr) => acc += charCodeModifier(curr.charCodeAt()),0)
    // return priorites.reduce((acc,curr) => acc += charCodeModifier(curr.charCodeAt()),0)
}

console.log(readInput())
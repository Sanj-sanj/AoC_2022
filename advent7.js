const { readFileSync } = require('fs')

const mockData = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

function readInput(mockOn) {
    try {
        if(mockOn) return crawlAndBuildFS(mockData.split('\n'))
        const data = readFileSync('day7.txt', 'utf-8')
        return crawlAndBuildFS(data.split('\n'))
    } catch (error) {
    console.error(error)        
    }
}

function fsCommands() {
    let currentPath = []
    
    const filesystem = {
        "/": {
            children:{}, 
            parent: '/',
            type: 'dir'
        }
    }
    const sizes = {}

    const cd = (dir) => {
        if(dir === '..') {
            currentPath.pop()
            return
        }
        currentPath.push(dir)
    }

    const calculateDirSize = (subDirectory) => {
        const subDirSize = subDirectory.reduce((acc,curr) =>{
            return !Number.isNaN(+curr[0]) ? acc += +curr.split(' ')[0] : acc
        }, 0)
        sizes[currentPath.join('')] = subDirSize
        currentPath.reduce((acc,curr) => {
            sizes[acc] += subDirSize
            return acc + curr
        })
    }

    return { cd, calculateDirSize, sizes }

}

function reduceLines(currIndex, consoleOutput) {
    //user command is "ls", we want to aggregate all the directorys into a subdirectory and jump our
    //main loops pointer up to the next user command 
    
    const subDirectorys = []
    for (let i = 1; i < consoleOutput.length; i++, currIndex++) {
        if(consoleOutput[i][0] === '$') break;
        subDirectorys.push(consoleOutput[i])
    }
    return {jumpIndexes: currIndex, subDirectorys}
}

function crawlAndBuildFS(consoleOutput) {
    const {cd, calculateDirSize, sizes} = fsCommands()
    for (let i = 0; i < consoleOutput.length; i++) {
        const commands = consoleOutput[i].split(' ')
        if(commands[0] === '$') {
            //line is a user command
            if(commands[1] === 'cd') {
                // console.log(consoleOutput[i])
                cd(commands[2])
            }
            if(commands[1] === 'ls') {
                const {jumpIndexes, subDirectorys} = reduceLines(i, consoleOutput.slice(i))
                i = jumpIndexes
                calculateDirSize(subDirectorys)
            }
        }
    }
    //here sizes will be fully built with {dir: size}... object
    // sum of all dirs with a total size of (n <= 100 000)
    console.log(Object.keys(sizes).filter((dir) => sizes[dir] <= 100000).reduce((a,b) => a += sizes[b], 0))
    const spaceAvailable = 70000000 - sizes['/']
    const updateSizeNeeded = 30000000 - spaceAvailable
    //sizes of dirs that are within the threshold of updateSizeNeeded
    console.log(Object.keys(sizes).filter((dir) => sizes[dir] >= updateSizeNeeded)
    .map(dir => `${[sizes[dir]]} ${dir}` )
    .sort((a,b) => a.split(' ')[0] - b.split(' ')[0] ))

}

readInput()
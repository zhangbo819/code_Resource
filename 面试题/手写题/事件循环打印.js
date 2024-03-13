console.log(1)

async function f1() {
    await f2()
    console.log(2)
}

async function f2() {
    await console.log(3)
    console.log(9)
}

f1()

setTimeout(() => {
    console.log(7)
    // f2()
})

new Promise((resolve) => {
    console.log(4)
    resolve(5)
}).then(r => {
    console.log(r)
    return 
}).then(() => {
    console.log(6)
})

console.log(8)
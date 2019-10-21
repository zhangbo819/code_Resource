var a = 0;

setInterval(() => {
    a++;
    process.nextTick(() => {
        console.log('in', a)
    })

    console.log('Interval1 ', a)

}, 1000)

setInterval(() => {
    a--;
    console.log('Interval2 ', a)

}, 1000)

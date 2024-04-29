// 3
// 第一次直接中 1/3 最终一定不中
// 第一次不中   2/3 最终一定中
// 4
// 第一次中 1/4 最终一定不中
// 第一次不中 3/4 再选一次 1/2 最终 3/8

function threeDoor(time = 10000, n = 3) {
    // 不换的结果
    const res_no_change = { win: 0 }
    // 换了的结果
    const res_change = { win: 0 }
    // 设置一个数组，来表示门如 4个门时 [0, 1, 2, 3]
    const data = new Array(n).fill(0).map((_, i) => i)
    // 数组长度用来生成一个 0-4 随机数
    const maxNumber = data.length

    for (let i = 0; i < time; i++) {
        // 正确答案小汽车所在的位置
        const car = Math.floor(Math.random() * maxNumber) // 0 1 2 3
        // 第一次选择的位置
        const firstChoose = Math.floor(Math.random() * maxNumber) // 0 1 2 3
        // 可以排除掉的位置数组
        const excludes = data.filter(i => i !== firstChoose && i !== car)
        // 排除掉的位置 随机找一个
        const exclude = excludes[Math.floor(Math.random() * excludes.length)]
        // const exclude = excludes[0] // 取0时，永远取不到最后一位
        // 剩余的门
        const newDoors = data.filter(i => i !== exclude && i !== firstChoose)
        // 新选择的位置
        const newChoose = newDoors[Math.floor(Math.random() * newDoors.length)] // right 37.5%
        // const newChoose = newDoors[0] // error 50%

        if (newChoose === car) {
            res_change.win++
        }
       
        if (firstChoose === car) {
            res_no_change.win++
        }
    }

    console.log(`${n}扇门`)
    console.log('换了的情况', (res_change.win / time * 100).toFixed(2) + '%')
    // console.log('不换的情况', (res_no_change.win / time * 100).toFixed(2) + '%')
}



threeDoor(10000, 4)
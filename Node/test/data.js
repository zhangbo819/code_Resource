var a1 = {
    a: 1,
    sentenceAudio: {
        "url": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/explain1.mp3",
        "timedown": 1,
        "pic": require('../rooter/images/test1.png'),
    },
};
var a2 = {
    a: 2,
    sentenceAudio: {
        "url": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/explain1.mp3",
        "timedown": 22,
        "pic": require('../rooter/images/test2.png'),
    },
};
var a3 = {
    b: 2,
    "audioBtn": { "path": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/stem1.mp3" },
    "sentenceAudio": {
        "url": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/explain1.mp3",
        "timedown": 30,
        "pic": require('../rooter/images/test3.png'),
    },
};


const sheetData = [a1, a2, a3];

module.exports = {
    sheetData
}
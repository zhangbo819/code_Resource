
const common = {
    piclist: [
        {
            "url": require('./images/common/exam.png'),
            "width": 96,
            "height": 288,
            "x": 68,
            "y": 291
        }
    ],
    hasRank: true,
    btnNext: {
        "text": "下一步",
        "url": require('./images/common/btn_next.png'),
        "width": 243,
        "height": 112,
        "x": 1638,
        "y": 932,
    },
    bgcolor: "rgba(255,255,255,0)",
};
const exam1 = {
    id: 0,
    type: 6,
    optlist: [],
    audioBtn: {
        "path": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/stem8.mp3",
        "url": null,
        "width": 95,
        "height": 98,
        "x": 34,
        "y": 36,
        "txt": "播放"
    },
    stem: {
        "url": require('./images/exam1/stem.png'),
        "text": "选出图中的年兽",
        "width": 782,
        "height": 464,
        "x": 1094,
        "y": 11,
    },
    processBar: {
        "url": require('./images/exam1/process.png'),
        "width": 1920,
        "height": 10,
        "x": 0,
        "y": 0,
        "txt": "进度条"
    },
    optlist: [
        {
            "url": require('./images/exam1/lh.png'),
            "sid": 0,
            "txt": "老虎",
            "value": 1,
            "isRight": 0,
            "width": 427,
            "height": 403,
            "x": 237,
            "y": 233
        },
        {
            "url": require('./images/exam1/xn.png'),
            "sid": 0,
            "txt": "犀牛",
            "value": 1,
            "isRight": 0,
            "width": 427,
            "height": 403,
            "x": 733,
            "y": 233
        },
        {
            "url": require('./images/exam1/ns.png'),
            "sid": 0,
            "txt": "年兽",
            "value": 1,
            "isRight": 1,
            "width": 427,
            "height": 403,
            "x": 1259,
            "y": 233
        },
    ],
    iconRight: {
        x: 1422,
        y: 699,
        x: 0, y: 46.5
    },
    ...common
};

const exam2 = {
    ...exam1,
    id: 1,
    stem: {
        "url": require('./images/exam2/stem.png'),
        "text": "年兽一般出现在",
        "width": 782,
        "height": 464,
        "x": 1094,
        "y": 11,
    },
    processBar: {
        "url": require('./images/exam2/process.png'),
        "width": 1920,
        "height": 10,
        "x": 0,
        "y": 0,
        "txt": "进度条"
    },
    optlist: [
        {
            "url": require('./images/exam2/chun.png'),
            "sid": 0,
            "txt": "春",
            "value": 1,
            "isRight": 0,
            width: 330,
            height: 506,
            "x": 235,
            y: 287
        },
        {
            "url": require('./images/exam2/xia.png'),
            "sid": 1,
            "txt": "夏",
            "value": 1,
            "isRight": 0,
            width: 330,
            height: 506,
            "x": 608,
            y: 287
        },
        {
            "url": require('./images/exam2/qiu.png'),
            "sid": 2,
            "txt": "秋",
            "value": 1,
            "isRight": 0,
            width: 330,
            height: 506,
            "x": 981,
            y: 287
        },
        {
            "url": require('./images/exam2/dong.png'),
            "sid": 3,
            "txt": "冬",
            "value": 1,
            "isRight": 1,
            width: 330,
            height: 506,
            "x": 1354,
            y: 287
        },
    ],
    iconRight: {
        x: 1422,
        y: 699,
        x: 0, y: 27
    },
};

const exam3 = {
    ...exam2,
    id: 2,
    stem: {
        "url": require('./images/exam3/stem.png'),
        "text": "年兽害怕什么",
        "width": 782,
        "height": 464,
        "x": 1094,
        "y": 11,
    },
    processBar: {
        "url": require('./images/exam3/process.png'),
        "width": 1920,
        "height": 10,
        "x": 0,
        "y": 0,
        "txt": "进度条"
    },
    optlist: [
        {
            "url": require('./images/exam3/火.png'),
            "sid": 0,
            "txt": "火",
            "value": 1,
            "isRight": 0,
            width: 392,
            height: 603,
            x: 268,
            y: 238
        },
        {
            "url": require('./images/exam3/竹子.png'),
            "sid": 0,
            "txt": "竹子",
            "value": 1,
            "isRight": 0,
            width: 392,
            height: 603,
            x: 764,
            y: 238
        },
        {
            "url": require('./images/exam3/巨大的声音.png'),
            "sid": 0,
            "txt": "巨大的声音",
            "value": 1,
            "isRight": 1,
            width: 392,
            height: 603,
            x: 1259,
            y: 238
        },
    ],
};

const exam4 = {
    ...exam2,
    id: 3,
    stem: {
        "url": require('./images/exam4/stem.png'),
        "text": "年兽害怕什么样的东西",
        "width": 782,
        "height": 464,
        "x": 1094,
        "y": 11,
    },
    processBar: {
        "url": require('./images/exam4/process.png'),
        "width": 1920,
        "height": 10,
        "x": 0,
        "y": 0,
        "txt": "进度条"
    },
    optlist: [
        {
            "url": require('./images/exam4/长长的东西.png'),
            "sid": 0,
            "txt": "长长的东西",
            "value": 1,
            "isRight": 0,
            width: 392,
            height: 603,
            x: 268,
            y: 238
        },
        {
            "url": require('./images/exam4/红色的东西.png'),
            "sid": 0,
            "txt": "红色的东西",
            "value": 1,
            "isRight": 1,
            width: 392,
            height: 603,
            x: 764,
            y: 238
        },
        {
            "url": require('./images/exam4/辣的东西.png'),
            "sid": 0,
            "txt": "辣的东西",
            "value": 1,
            "isRight": 0,
            width: 392,
            height: 603,
            x: 1259,
            y: 238
        },
    ],
}

const exam5 = {
    ...exam4,
    id: 4,
    stem: {
        "url": require('./images/exam5/stem.png'),
        "text": "为了驱赶年兽人们发明了",
        "width": 782,
        "height": 464,
        "x": 1094,
        "y": 11,
    },
    processBar: {
        "url": require('./images/exam5/process.png'),
        "width": 1920,
        "height": 10,
        "x": 0,
        "y": 0,
        "txt": "进度条"
    },
    optlist: [
        {
            "url": require('./images/exam5/烟花和压岁钱.png'),
            "sid": 0,
            "txt": "烟花和压岁钱",
            "value": 1,
            "isRight": 0,
            width: 392,
            height: 603,
            x: 268,
            y: 238
        },
        {
            "url": require('./images/exam5/爆竹和桃符.png'),
            "sid": 1,
            "txt": "爆竹和桃符",
            "value": 1,
            "isRight": 1,
            width: 392,
            height: 603,
            x: 764,
            y: 238
        },
        {
            "url": require('./images/exam5/春晚和年夜饭.png'),
            "sid": 2,
            "txt": "春晚和年夜饭",
            "value": 1,
            "isRight": 0,
            width: 392,
            height: 603,
            x: 1259,
            y: 238
        },
    ],
};

const exam6 = {
    id: 5,
    type: 24,
    ...common,
    audioBtn: {
        "path": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/stem13.mp3",
        "url": null,
        "width": 0,
        "height": 0,
        "x": 0,
        "y": 0,
        "txt": "播放"
    },
    stem: {
        "url": require('./images/exam6/stem.png'),
        "text": "用今天学到的诗句回答问题",
        "width": 1086,
        "height": 464,
        "x": 790,
        "y": 11,
    },
    processBar: {
        "url": require('./images/exam6/process.png'),
        "width": 1920,
        "height": 10,
        "x": 0,
        "y": 0,
        "txt": "进度条"
    },
    piclist: [
        {
            "url": require('./images/common/exam.png'),
            "width": 96,
            "height": 288,
            "x": 68,
            "y": 291
        },
        {
            "url": require('./images/exam6/旁白框.png'),
            "width": 1920,
            "height": 286,
            "x": 0,
            "y": 794
        },
    ],
    targetPic: [{
        "width": 844,
        "height": 486,
        "x": 538,
        "y": 195,
        "list": [
            require('./images/exam6/tp1.png'),
            require('./images/exam6/tp2.png'),
            require('./images/exam6/tp3.png'),
            require('./images/exam6/tp4.png'),
            require('./images/exam6/tp5.png'),
            require('./images/exam6/tp6.png'),
            require('./images/exam6/tp7.png'),
        ]
    }],
    answer: [0, 1, 2, 3, 4, 5],
    optlist: [
        {
            "sid": 0,
            "txt": "爆竹",
            "url": require('./images/exam6/爆竹.png'),
            "width": 217,
            "height": 214,
            "x": 241,
            "y": 833,
            group: 0,
            value: 0,
            zIndex: 5,
            target: [{ "width": 844, "height": 486, "x": 538, "y": 195 }],
        },
        {
            "sid": 1,
            "txt": "鞭炮",
            "url": require('./images/exam6/鞭炮.png'),
            "width": 217,
            "height": 214,
            "x": 486,
            "y": 833,
            group: 0,
            value: 1,
            zIndex: 5,
            target: [{ "width": 844, "height": 486, "x": 538, "y": 195 }],
        },
        {
            "sid": 2,
            "txt": "春联",
            "url": require('./images/exam6/春联.png'),
            "width": 217,
            "height": 214,
            "x": 730,
            "y": 833,
            group: 0,
            value: 2,
            zIndex: 5,
            target: [{ "width": 844, "height": 486, "x": 538, "y": 195 }],
        },
        {
            "sid": 3,
            "txt": "福",
            "url": require('./images/exam6/福.png'),
            "width": 217,
            "height": 214,
            "x": 975,
            "y": 833,
            group: 0,
            value: 3,
            zIndex: 5,
            target: [{ "width": 844, "height": 486, "x": 538, "y": 195 }],
        },
        {
            "sid": 4,
            "txt": "横幅",
            "url": require('./images/exam6/横幅.png'),
            "width": 217,
            "height": 214,
            "x": 1219,
            "y": 833,
            group: 0,
            value: 4,
            zIndex: 5,
            target: [{ "width": 844, "height": 486, "x": 538, "y": 195 }],
        },
        {
            "sid": 5,
            "txt": "窗花",
            "url": require('./images/exam6/窗花.png'),
            "width": 217,
            "height": 214,
            "x": 1464,
            "y": 833,
            group: 0,
            value: 5,
            zIndex: 5,
            target: [{ "width": 844, "height": 486, "x": 538, "y": 195 }],
        },
    ],
    "thumbUp": {
        "url": require('./images/common/state_right.png'),
        "width": 151,
        "height": 94,
        "x": 0,
        "y": 557,
        "txt": "对了"
    },
    "edu_target": 1,
    "blankNum": 2,
    "groupNum": 1,
};

const exam7 = {
    id: 6,
    type: 12,
    ...common,
    stem: {
        "url": require('./images/exam7/stem.png'),
        "text": "年兽来了！快赶走它！",
        "width": 782,
        "height": 464,
        "x": 1094,
        "y": 11,
    },
    processBar: {
        "url": require('./images/exam7/process.png'),
        "width": 1920,
        "height": 10,
        "x": 0,
        "y": 0,
        "txt": "进度条"
    },

    "imgContainer": {
        "width": 1295,
        "height": 746,
        "x": 312,
        "y": 169,
    },
    "imglist": [
        {
            "imgid": 1,
            "value": 1,
            "url": require('./images/exam7/op1.png'),
            "width": 1295,
            "height": 746,
            "x": 312,
            "y": 169,
        },
        {
            "imgid": 2,
            "value": 2,
            "url": require('./images/exam7/op2.png'),
            "width": 1295,
            "height": 746,
            "x": 312,
            "y": 169,
        },
        {
            "imgid": 3,
            "value": 3,
            "url": require('./images/exam7/op3.png'),
            "width": 1295,
            "height": 746,
            "x": 312,
            "y": 169,
        },
        {
            "imgid": 4,
            "value": 4,
            "url": require('./images/exam7/op4.png'),
            "width": 1295,
            "height": 746,
            "x": 312,
            "y": 169,
        },
        {
            "imgid": 5,
            "value": 5,
            "url": require('./images/exam7/op5.png'),
            "width": 1295,
            "height": 746,
            "x": 312,
            "y": 169,
        },
        {
            "imgid": 6,
            "value": 6,
            "url": require('./images/exam7/op6.png'),
            "width": 1295,
            "height": 746,
            "x": 312,
            "y": 169,
        },
    ],
    "explain": [{
        // "url": require('./images/learn1/explain.png'),
        // "width": 1392,
        // "height": 88,
        // "x": 235,
        // "y": 913
    }],
    "sentenceAudio": {
        "path": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/explain1.mp3",
        "timedown": 6.5
    }
};

export const sheetData = [
    exam1, exam2, exam3, exam4, exam5,
    exam6,
    exam7
];
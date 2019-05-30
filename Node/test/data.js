export const sheetData = [
    [
        {
            "id": 1,
            "type": 25,
            "bgcolor": "rgba(0,0,0,0)",
            "btnType": 'learn',
            "optlist": [
                {
                    "sid": 0,
                    "value": 1,
                    "txt": "崖山之战",
                    "url": require('./images/common/card_back.png'),
                    "width": 390,
                    "height": 641,
                    "x": 755,
                    "y": 100,
                    "pic": require('./images/card/card1.png'),
                },
            ],
            "btnNext": {
                "text": "下一步",
                "url": require('./images/common/btn_learn.png'),
                "width": 248,
                "height": 109,
                "x": 836,
                "y": 810,
            },
        },
        {
            "id": 2,
            "type": 24,
            "bgcolor": 'rgba(255,255,255,0)',
            "edu_target": 1,
            "audioBtn": {
                "path": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/stem1.mp3",
                "url": require('./images/common/icon_play.png'),
                "width": 148,   
                "height": 163,
                "x": 1722,
                "y": 11,
                "pic": require('./images/common/icon_done.png'),
                "txt": "播放"
            },
            "stem": {
                "url": require('./images/learn1/stem.png'),
                "text": "拖拽正确的元素到图中，重现崖山之战 ",
                "width": 736,
                "height": 70,
                "x": 970,
                "y": 57,
            },
            "processBar": {
                "url": require('./images/learn1/process.png'),
                "width": 1920,
                "height": 10,
                "x": 0,
                "y": 0,
                "txt": "进度条"
            },
            "piclist": [
                {
                    "url": require('./images/common/icon_learn.png'),
                    "width": 219,
                    "height": 104,
                    "x": 136,
                    "y": 35
                },
                {
                    "url": require('./images/common/bg.jpg'),
                    "width": 1920,
                    "height": 280,
                    "x": 0,
                    "y": 800,
                },
            ],
            "targetPic": [
                {
                    "width": 990,
                    "height": 644,
                    "x": 465,
                    "y": 143,
                    "list": [
                        require('./images/learn1/m1.png'),
                        require('./images/learn1/m2.png'),
                        require('./images/learn1/m3.png'),
                    ]
                }
            ],
            "blankNum": 2,
            "answer": [[0, 1]],
            "no_answer": [2],
            "groupNum": 1,
            "optlist": [
                {
                    "sid": 0,
                    "txt": "崖山",
                    "group": 0,
                    "value": 0,
                    "url": require('./images/learn1/a1.png'),
                    "width": 150,
                    "height": 163,
                    "x": 205,
                    "y": 861,
                    "zIndex": 5,
                    "target": [{ "width": 990, "height": 644, "x": 465, "y": 143, }]
                },
                {
                    "sid": 1,
                    "txt": "战",
                    "group": 0,
                    "value": 1,
                    "url": require('./images/learn1/a2.png'),
                    "width": 772,
                    "height": 163,
                    "x": 384,
                    "y": 861,
                    "zIndex": 5,
                    "target": [{ "width": 990, "height": 644, "x": 465, "y": 143, }]
                },
                {
                    "sid": 2,
                    "txt": "战-错",
                    "group": 1,
                    "value": 0,
                    "url": require('./images/learn1/a3.png'),
                    "width": 665,
                    "height": 163,
                    "x": 1184,
                    "y": 861,
                    "zIndex": 5,
                    "target": []
                },
            ],
            "explain": [
                {
                    "url": require('./images/learn1/explain.png'),
                    "width": 1417,
                    "height": 193,
                    "x": 205,
                    "y": 844,
                },
            ],
            "sentenceAudio": {
                "url": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/explain1.mp3",
                "timedown": 13
            },
            "thumbUp": {
                "url": require('./images/common/state_right.png'),
                "width": 151,
                "height": 94,
                "x": 0,
                "y": 557,
                "txt": "对了"
            },
            "btnNext": {
                "text": "下一步",
                "url": require('./images/common/btn_next.png'),
                "width": 224,
                "height": 94,
                "x": 1610,
                "y": 910,
            },
        },
        {
            "id": 3,
            "type": 25,
            "bgcolor": "rgba(0,0,0,0)",
            "btnType": 'exam',
            "optlist": [
                {
                    "sid": 0,
                    "value": 1,
                    "txt": "崖山之战",
                    "url": require('./images/card/card1.png'),
                    "width": 390,
                    "height": 641,
                    "x": 755,
                    "y": 100,
                },
            ],
            "btnNext": {
                "text": "下一步",
                "url": require('./images/common/btn_exam.png'),
                "width": 248,
                "height": 109,
                "x": 836,
                "y": 810,
            },
        },
        {
            "id": 6,
            "type": 8,
            "bgcolor": "rgba(0,0,0,0)",
            "audioBtn": {
                "path": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/stem3.mp3",
                "url": require('./images/common/icon_play.png'),
                "width": 148,
                "height": 163,
                "x": 1722,
                "y": 11,
                "pic": require('./images/common/icon_done.png'),
                "txt": "播放"
            },
            "stem": {
                "url": require('./images/exam1/stem.png'),
                "text": "拖拽正确的选项到合适位置",
                "width": 583,
                "height": 70,
                "x": 1124,
                "y": 57,
            },
            "processBar": {
                "url": require('./images/exam1/process.png'),
                "width": 1920,
                "height": 10,
                "x": 0,
                "y": 0,
                "txt": "进度条"
            },
            "piclist": [
                {
                    "url": require('./images/common/icon_exam.png'),
                    "width": 227,
                    "height": 112,
                    "x": 132,
                    "y": 35
                },
                {
                    "url": require('./images/common/bg.jpg'),
                    "width": 1920,
                    "height": 280,
                    "x": 0,
                    "y": 800
                },
            ],
            "blankArea": {
                "url": require('./images/exam1/blank_area.png'),
                "width": 1703,
                "height": 585,
                "x": 109,
                "y": 163,
                "zIndex": 1,
                "txt": "崖山之战是南宋军队和蒙古军队进行的一场大规模的海战"
            },
            "blankNum": 2,
            "answer": [[2, 4]],
            "blankList": [
                { "width": 156, "height": 98, "x": 780, "y": 657 },
                { "width": 285, "height": 98, "x": 108, "y": 657 }
            ],
            "optlist": [
                {
                    "sid": 0,
                    "txt": "辽国",
                    "value": 1,
                    "url": require('./images/exam1/a1.png'),
                    "width": 156,
                    "height": 98,
                    "x": 447,
                    "y": 894,
                    "zIndex": 3,
                    "target": []
                },
                {
                    "sid": 2,
                    "txt": "蒙古",
                    "value": 1,
                    "url": require('./images/exam1/a2.png'),
                    "width": 156,
                    "height": 98,
                    "x": 695,
                    "y": 894,
                    "zIndex": 3,
                    "target": [
                        { "width": 156, "height": 98, "x": 780, "y": 657 },
                    ]
                },
                {
                    "sid": 3,
                    "txt": "金国",
                    "value": 1,
                    "url": require('./images/exam1/a3.png'),
                    "width": 156,
                    "height": 98,
                    "x": 942,
                    "y": 894,
                    "zIndex": 3,
                    "target": []
                },
                {
                    "sid": 4,
                    "txt": "崖山之战",
                    "value": 1,
                    "url": require('./images/exam1/a4.png'),
                    "width": 285,
                    "height": 98,
                    "x": 1189,
                    "y": 894,
                    "zIndex": 3,
                    "target": [
                        { "width": 285, "height": 98, "x": 108, "y": 657 }
                    ]
                },
            ],
            "sentenceAudio": {
                "url": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/result1.mp3",
                "timedown": 6.5
            },
            "btnNext": {
                "text": "下一步",
                "url": require('./images/common/btn_next.png'),
                "width": 224,
                "height": 94,
                "x": 1610,
                "y": 910,
            },
            "hasRank": true
        },
        {
            "id": 6,
            "type": 8,
            "bgcolor": "rgba(0,0,0,0)",
            "audioBtn": {
                "path": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/stem3.mp3",
                "url": require('./images/common/icon_play.png'),
                "width": 148,
                "height": 163,
                "x": 1722,
                "y": 11,
                "pic": require('./images/common/icon_done.png'),
                "txt": "播放"
            },
            "stem": {
                "url": require('./images/exam1/stem.png'),
                "text": "拖拽正确的选项到合适位置",
                "width": 583,
                "height": 70,
                "x": 1124,
                "y": 57,
            },
            "processBar": {
                "url": require('./images/exam2/process.png'),
                "width": 1920,
                "height": 10,
                "x": 0,
                "y": 0,
                "txt": "进度条"
            },
            "piclist": [
                {
                    "url": require('./images/common/icon_exam.png'),
                    "width": 227,
                    "height": 112,
                    "x": 132,
                    "y": 35
                },
                {
                    "url": require('./images/common/bg.jpg'),
                    "width": 1920,
                    "height": 280,
                    "x": 0,
                    "y": 800
                },
            ],
            "blankArea": {
                "url": require('./images/exam2/blank_area.png'),
                "width": 1077,
                "height": 591,
                "x": 422,
                "y": 163,
                "zIndex": 1,
                "txt": "崖山之战是南宋军队和蒙古军队进行的一场大规模的海战"
            },
            "blankNum": 2,
            "answer": [[0]],
            "blankList": [
                { "width": 176, "height": 105, "x": 732, "y": 656 }
            ],
            "optlist": [
                {
                    "sid": 0,
                    "txt": "南宋",
                    "value": 1,
                    "url": require('./images/exam2/a1.png'),
                    "width": 176,
                    "height": 105,
                    "x": 587,
                    "y": 891,
                    "zIndex": 3,
                    "target": [{ "width": 176, "height": 105, "x": 732, "y": 656 }]
                },
                {
                    "sid": 0,
                    "txt": "北宋",
                    "value": 1,
                    "url": require('./images/exam2/a2.png'),
                    "width": 176,
                    "height": 105,
                    "x": 873,
                    "y": 891,
                    "zIndex": 3,
                    "target": []
                },
                {
                    "sid": 2,
                    "txt": "蒙古",
                    "value": 1,
                    "url": require('./images/exam2/a3.png'),
                    "width": 176,
                    "height": 105,
                    "x": 1158,
                    "y": 891,
                    "zIndex": 3,
                    "target": []
                },
            ],
            "sentenceAudio": {
                "url": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/result2.mp3",
                "timedown": 4
            },
            "btnNext": {
                "text": "下一步",
                "url": require('./images/common/btn_next.png'),
                "width": 224,
                "height": 94,
                "x": 1610,
                "y": 910,
            },
            "hasRank": true
        },
    ],

    [
        {
            "id": 8,
            "type": 25,
            "bgcolor": "rgba(0,0,0,0)",
            "btnType": 'learn',
            "optlist": [
                {
                    "sid": 0,
                    "value": 1,
                    "txt": "《马可·波罗游记》",
                    "url": require('./images/common/card_back.png'),
                    "width": 390,
                    "height": 641,
                    "x": 755,
                    "y": 100,
                    "pic": require('./images/card/card2.png'),
                },
            ],
            "btnNext": {
                "text": "下一步",
                "url": require('./images/common/btn_learn.png'),
                "width": 248,
                "height": 109,
                "x": 836,
                "y": 810,
            },
        },
        {
            "id": 2,
            "type": 24,
            "bgcolor": 'rgba(255,255,255,0)',
            "edu_target": 1,
            "audioBtn": {
                "path": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/stem4.mp3",
                "url": require('./images/common/icon_play.png'),
                "width": 148,
                "height": 163,
                "x": 1722,
                "y": 11,
                "pic": require('./images/common/icon_done.png'),
                "txt": "播放"
            },
            "stem": {
                "url": require('./images/learn2/stem.png'),
                "text": "按顺序拖拽文字到图中，制作《马可·波罗游记》 ",
                ...getXYWH(804, 57, 902, 70)
            },
            "processBar": {
                "url": require('./images/learn1/process.png'),
                "width": 1920,
                "height": 10,
                "x": 0,
                "y": 0,
                "txt": "进度条"
            },
            "piclist": [
                {
                    "url": require('./images/common/icon_learn.png'),
                    "width": 219,
                    "height": 104,
                    "x": 136,
                    "y": 35
                },
                {
                    "url": require('./images/common/bg.jpg'),
                    "width": 1920,
                    "height": 280,
                    "x": 0,
                    "y": 800,
                },
            ],
            "targetPic": [
                {
                    ...getXYWH(465, 143, 990, 644),
                    "list": [
                        require('./images/learn2/m1.png'),
                        require('./images/learn2/m2.png'),
                        require('./images/learn2/m3.png'),
                    ]
                }
            ],
            "blankNum": 2,
            "answer": [[0, 1]],
            "no_answer": [],
            "groupNum": 1,
            "optlist": [
                {
                    "sid": 0,
                    "txt": "马克",
                    "group": 0,
                    "value": 0,
                    "url": require('./images/learn2/a1.png'),
                    ...getXYWH(205, 861, 866, 163),
                    "zIndex": 5,
                    "target": [getXYWH(465, 143, 990, 644, true)]
                },
                {
                    "sid": 1,
                    "txt": "游记",
                    "group": 0,
                    "value": 1,
                    "url": require('./images/learn2/a2.png'),
                    ...getXYWH(1138, 861, 625, 163),
                    "zIndex": 5,
                    "target": [getXYWH(465, 143, 990, 644, true)]
                },
            ],
            "explain": [
                {
                    "url": require('./images/learn2/explain.png'),
                    ...getXYWH(205, 847, 1481, 186),
                },
            ],
            "sentenceAudio": {
                "url": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/explain2.mp3",
                "timedown": 7.5
            },
            "thumbUp": {
                "url": require('./images/common/state_right.png'),
                "width": 151,
                "height": 94,
                "x": 0,
                "y": 557,
                "txt": "对了"
            },
            "btnNext": {
                "text": "下一步",
                "url": require('./images/common/btn_next.png'),
                "width": 224,
                "height": 94,
                "x": 1610,
                "y": 910,   
            },
        },
        {
            "id": 3,
            "type": 25,
            "bgcolor": "rgba(0,0,0,0)",
            "btnType": 'exam',
            "optlist": [
                {
                    "sid": 0,
                    "value": 1,
                    "txt": "《马可·波罗游记》",
                    "url": require('./images/card/card2.png'),
                    "width": 390,
                    "height": 641,
                    "x": 755,
                    "y": 100,
                },
            ],
            "btnNext": {
                "text": "下一步",
                "url": require('./images/common/btn_exam.png'),
                "width": 248,
                "height": 109,
                "x": 836,
                "y": 810,
            },
        },
        {
            "id": 12,
            "type": 8,
            "bgcolor": "rgba(0,0,0,0)",
            "audioBtn": {
                "path": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/stem3.mp3",
                "url": require('./images/common/icon_play.png'),
                "width": 148,
                "height": 163,
                "x": 1722,
                "y": 11,
                "pic": require('./images/common/icon_done.png'),
                "txt": "播放"
            },
            "stem": {
                "url": require('./images/exam3/stem.png'),
                "text": "拖拽正确的选项到合适位置",
                "width": 583,
                "height": 70,
                "x": 1124,
                "y": 57,
            },
            "processBar": {
                "url": require('./images/exam3/process.png'),
                "width": 1920,
                "height": 10,
                "x": 0,
                "y": 0,
                "txt": "进度条"
            },
            "piclist": [
                {
                    "url": require('./images/common/icon_exam.png'),
                    "width": 227,
                    "height": 112,
                    "x": 132,
                    "y": 35
                },
                {
                    "url": require('./images/common/bg.jpg'),
                    "width": 1920,
                    "height": 280,
                    "x": 0,
                    "y": 800
                },
            ],
            "blankArea": {
                "url": require('./images/exam3/blank_area.png'),
                "width": 1704,
                "height": 593,
                "x": 108,
                "y": 155,
                "zIndex": 1,
                "txt": "马可波罗在中国"
            },
            "blankNum": 3,
            "answer": [[0, 3]],
            "blankList": [
                { "width": 490, "height": 98, "x": 1289, "y": 656 },
                { "width": 311, "height": 98, "x": 107, "y": 656 }
            ],
            "optlist": [
                {
                    "sid": 0,
                    "txt": "马可波罗游记",
                    "value": 1,
                    "url": require('./images/exam3/a1.png'),
                    "width": 490,
                    "height": 98,
                    "x": 205,
                    "y": 894,
                    "zIndex": 3,
                    "target": [
                        { "width": 490, "height": 98, "x": 1289, "y": 656 },
                    ]
                },
                {
                    "sid": 1,
                    "txt": "太平御览",
                    "value": 1,
                    "url": require('./images/exam3/a2.png'),
                    "width": 348,
                    "height": 98,
                    "x": 722,
                    "y": 894,
                    "zIndex": 3,
                    "target": []
                },
                {
                    "sid": 2,
                    "txt": "马克菠萝",
                    "value": 1,
                    "url": require('./images/exam3/a3.png'),
                    "width": 311,
                    "height": 98,
                    "x": 1097,
                    "y": 894,
                    "zIndex": 3,
                    "target": []
                },
                {
                    "sid": 3,
                    "txt": "马可波罗",
                    "value": 1,
                    "url": require('./images/exam3/a4.png'),
                    "width": 311,
                    "height": 98,
                    "x": 1435,
                    "y": 894,
                    "target": [{ "width": 311, "height": 98, "x": 107, "y": 656 }]
                },
            ],
            "sentenceAudio": {
                "url": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/result3.mp3",
                "timedown": 7
            },
            "btnNext": {
                "text": "下一步",
                "url": require('./images/common/btn_next.png'),
                "width": 224,
                "height": 94,
                "x": 1610,
                "y": 910,
            },
            "hasRank": true
        },
        {
            "id": 12,
            "type": 8,
            "bgcolor": "rgba(0,0,0,0)",
            "audioBtn": {
                "path": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/stem3.mp3",
                "url": require('./images/common/icon_play.png'),
                "width": 148,
                "height": 163,
                "x": 1722,
                "y": 11,
                "pic": require('./images/common/icon_done.png'),
                "txt": "播放"
            },
            "stem": {
                "url": require('./images/exam3/stem.png'),
                "text": "拖拽正确的选项到合适位置",
                "width": 583,
                "height": 70,
                "x": 1124,
                "y": 57,
            },
            "processBar": {
                "url": require('./images/exam4/process.png'),
                "width": 1920,
                "height": 10,
                "x": 0,
                "y": 0,
                "txt": "进度条"
            },
            "piclist": [
                {
                    "url": require('./images/common/icon_exam.png'),
                    "width": 227,
                    "height": 112,
                    "x": 132,
                    "y": 35
                },
                {
                    "url": require('./images/common/bg.jpg'),
                    "width": 1920,
                    "height": 280,
                    "x": 0,
                    "y": 800
                },
            ],
            "blankArea": {
                "url": require('./images/exam4/blank_area.png'),
                "width": 1460,
                "height": 530,
                "x": 230,
                "y": 222,
                "zIndex": 1,
                "txt": "元朝时期"
            },
            "blankNum": 3,
            "answer": [[1, 3]],
            "blankList": [
                { "width": 176, "height": 105, "x": 228, "y": 653 },
                { "width": 208, "height": 105, "x": 603, "y": 653 }
            ],
            "optlist": [
                {
                    "sid": 0,
                    "txt": "宋朝",
                    "value": 1,
                    "url": require('./images/exam4/a1.png'),
                    "width": 176,
                    "height": 105,
                    "x": 462,
                    "y": 891,
                    "zIndex": 3,
                    "target": []
                },
                {
                    "sid": 1,
                    "txt": "元朝",
                    "value": 1,
                    "url": require('./images/exam4/a2.png'),
                    "width": 176,
                    "height": 105,
                    "x": 725,
                    "y": 891,
                    "zIndex": 3,
                    "target": [{ "width": 176, "height": 105, "x": 228, "y": 653 }]
                },
                {
                    "sid": 2,
                    "txt": "美国",
                    "value": 1,
                    "url": require('./images/exam4/a3.png'),
                    "width": 176,
                    "height": 105,
                    "x": 988,
                    "y": 891,
                    "zIndex": 3,
                    "target": []
                },
                {
                    "sid": 3,
                    "txt": "意大利",
                    "value": 1,
                    "url": require('./images/exam4/a4.png'),
                    "width": 208,
                    "height": 105,
                    "x": 1250,
                    "y": 891,
                    "target": [{ "width": 208, "height": 105, "x": 603, "y": 653 }]
                },
            ],
            "sentenceAudio": {
                "url": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/result4.mp3",
                "timedown": 6
            },
            "btnNext": {
                "text": "下一步",
                "url": require('./images/common/btn_next.png'),
                "width": 224,
                "height": 94,
                "x": 1610,
                "y": 910,
            },
            "hasRank": true
        }
    ],

    [
        {
            "id": 8,
            "type": 25,
            "bgcolor": "rgba(0,0,0,0)",
            "btnType": 'learn',
            "optlist": [
                {
                    "sid": 0,
                    "value": 1,
                    "txt": "成语（过河拆桥）",
                    "url": require('./images/common/card_back.png'),
                    "width": 390,
                    "height": 641,
                    "x": 755,
                    "y": 100,
                    "pic": require('./images/card/card3.png'),
                },
            ],
            "btnNext": {
                "text": "下一步",
                "url": require('./images/common/btn_learn.png'),
                "width": 248,
                "height": 109,
                "x": 836,
                "y": 810,
            },
        },
        {
            "id": 2,
            "type": 24,
            "bgcolor": 'rgba(255,255,255,0)',
            "edu_target": 1,
            "audioBtn": {
                "path": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/stem5.mp3",
                "url": require('./images/common/icon_play.png'),
                "width": 148,
                "height": 163,
                "x": 1722,
                "y": 11,
                "pic": require('./images/common/icon_done.png'),
                "txt": "播放"
            },
            "stem": {
                "url": require('./images/learn3/stem.png'),
                "text": "按顺序拖拽文字到图中，理解“过河拆桥”",
                "width": 810,
                "height": 70,
                "x": 896,
                "y": 57,
            },
            "processBar": {
                "url": require('./images/learn2/process.png'),
                "width": 1920,
                "height": 10,
                "x": 0,
                "y": 0,
                "txt": "进度条"
            },
            "piclist": [
                {
                    "url": require('./images/common/icon_learn.png'),
                    "width": 219,
                    "height": 104,
                    "x": 136,
                    "y": 35
                },
                {
                    "url": require('./images/common/bg.jpg'),
                    "width": 1920,
                    "height": 280,
                    "x": 0,
                    "y": 800,
                },
            ],
            "targetPic": [
                {
                    "width": 1401,
                    "height": 644,
                    "x": 260,
                    "y": 143,
                    "list": [
                        require('./images/learn3/m1.png'),
                        require('./images/learn3/m2.png'),
                        require('./images/learn3/m3.png'),
                    ]
                }
            ],
            "blankNum": 2,
            "answer": [[0, 1]],
            "no_answer": [],
            "groupNum": 1,
            "optlist": [
                {
                    "sid": 0,
                    "txt": "过河",
                    "group": 0,
                    "value": 0,
                    "url": require('./images/learn3/a1.png'),
                    "width": 235,
                    "height": 163,
                    "x": 456,
                    "y": 861,
                    "zIndex": 5,
                    "target": [{ "width": 1401, "height": 644, "x": 260, "y": 143 }]
                },
                {
                    "sid": 1,
                    "txt": "拆桥",
                    "group": 0,
                    "value": 1,
                    "url": require('./images/learn3/a2.png'),
                    "width": 625,
                    "height": 163,
                    "x": 840,
                    "y": 861,
                    "zIndex": 5,
                    "target": [{ "width": 1401, "height": 644, "x": 260, "y": 143 }]
                },
            ],
            "explain": [
                {
                    "url": require('./images/learn3/explain.png'),
                    "width": 1375,
                    "height": 252,
                    "x": 205,
                    "y": 818,
                },
            ],
            "sentenceAudio": {
                "url": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/result5.mp3",
                "timedown": 11.5
            },
            "thumbUp": {
                "url": require('./images/common/state_right.png'),
                "width": 151,
                "height": 94,
                "x": 0,
                "y": 557,
                "txt": "对了"
            },
            "btnNext": {
                "text": "下一步",
                "url": require('./images/common/btn_next.png'),
                "width": 224,
                "height": 94,
                "x": 1610,
                "y": 910,
            },
        },
        {
            "id": 10,
            "type": 25,
            "bgcolor": "rgba(0,0,0,0)",
            "btnType": 'exam',
            "optlist": [
                {
                    "sid": 0,
                    "value": 1,
                    "txt": "成语（过河拆桥）",
                    "url": require('./images/card/card3.png'),
                    "width": 390,
                    "height": 641,
                    "x": 755,
                    "y": 100,
                },
            ],
            "btnNext": {
                "text": "下一步",
                "url": require('./images/common/btn_exam.png'),
                "width": 248,
                "height": 109,
                "x": 836,
                "y": 810,
            },
        },
        {
            "id": 12,
            "type": 8,
            "bgcolor": "rgba(0,0,0,0)",
            "audioBtn": {
                "path": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/stem3.mp3",
                "url": require('./images/common/icon_play.png'),
                "width": 148,
                "height": 163,
                "x": 1722,
                "y": 11,
                "pic": require('./images/common/icon_done.png'),
                "txt": "播放"
            },
            "stem": {
                "url": require('./images/exam3/stem.png'),
                "text": "拖拽正确的选项到合适位置",
                "width": 583,
                "height": 70,
                "x": 1124,
                "y": 57,
            },
            "processBar": {
                "url": require('./images/exam5/process.png'),
                "width": 1920,
                "height": 10,
                "x": 0,
                "y": 0,
                "txt": "进度条"
            },
            "piclist": [
                {
                    "url": require('./images/common/icon_exam.png'),
                    "width": 227,
                    "height": 112,
                    "x": 132,
                    "y": 35
                },
                {
                    "url": require('./images/common/bg.jpg'),
                    "width": 1920,
                    "height": 280,
                    "x": 0,
                    "y": 800
                },
            ],
            "blankArea": {
                "url": require('./images/exam5/blank_area.png'),
                "width": 1451,
                "height": 621,
                "x": 235,
                "y": 146,
                "zIndex": 1,
                "txt": "得到别人的帮助"
            },
            "blankNum": 3,
            "answer": [[1]],
            "blankList": [
                { "width": 284, "height": 98, "x": 1365, "y": 674 }
            ],
            "optlist": [
                {
                    "sid": 0,
                    "txt": "知恩图报",
                    "value": 1,
                    "url": require('./images/exam5/a1.png'),
                    "width": 284,
                    "height": 98,
                    "x": 421,
                    "y": 894,
                    "zIndex": 3,
                    "target": []
                },
                {
                    "sid": 1,
                    "txt": "过河拆桥",
                    "value": 1,
                    "url": require('./images/exam5/a2.png'),
                    "width": 284,
                    "height": 98,
                    "x": 819,
                    "y": 894,
                    "zIndex": 3,
                    "target": [{ "width": 284, "height": 98, "x": 1365, "y": 674 }]
                },
                {
                    "sid": 2,
                    "txt": "卸磨杀驴",
                    "value": 1,
                    "url": require('./images/exam5/a3.png'),
                    "width": 284,
                    "height": 98,
                    "x": 1216,
                    "y": 894,
                    "zIndex": 3,
                    "target": []
                },
            ],
            "sentenceAudio": {
                "url": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/result6.mp3",
                "timedown": 5
            },
            "btnNext": {
                "text": "下一步",
                "url": require('./images/common/btn_next.png'),
                "width": 224,
                "height": 94,
                "x": 1610,
                "y": 910,
            },
            "hasRank": true
        },
        {
            "id": 4,
            "type": 23,
            "bgcolor": "rgba(0,0,0,0)",
            "audioBtn": {
                "path": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/stem2.mp3",
                "url": require('./images/common/icon_play.png'),
                "width": 148,
                "height": 163,
                "x": 1722,
                "y": 11,
                "pic": require('./images/common/icon_done.png'),
                "txt": "播放"
            },
            "stem": {
                "url": require('./images/exam6/stem.png'),
                "text": "选择正确的选项",
                "width": 389,
                "height": 70,
                "x": 1317,
                "y": 57,
            },
            "processBar": {
                "url": require('./images/exam6/process.png'),
                "width": 1920,
                "height": 10,
                "x": 0,
                "y": 0,
                "txt": "进度条"
            },
            "piclist": [
                {
                    "url": require('./images/common/icon_exam.png'),
                    "width": 227,
                    "height": 112,
                    "x": 132,
                    "y": 35
                },
            ],
            "optlist": [
                {
                    "sid": 0,
                    "txt": "过何拆桥",
                    "value": 2,
                    "isRight": 0,
                    "url": require('./images/exam6/a1.png'),
                    "width": 460,
                    "height": 136,
                    "x": 730,
                    "y": 241
                },
                {
                    "sid": 1,
                    "txt": "过河折桥",
                    "value": 2,
                    "isRight": 0,
                    "url": require('./images/exam6/a2.png'),
                    "width": 460,
                    "height": 136,
                    "x": 730,
                    "y": 476
                },
                {
                    "sid": 2,
                    "txt": "过河拆桥",
                    "value": 2,
                    "isRight": 1,
                    "url": require('./images/exam6/a3.png'),
                    "width": 460,
                    "height": 136,
                    "x": 730,
                    "y": 710
                },
            ],
            "btnNext": {
                "text": "下一步",
                "url": require('./images/common/btn_next.png'),
                "width": 224,
                "height": 94,
                "x": 1610,
                "y": 910,
            },
            "hasRank": true
        },
    ],

    [
        {
            "id": 2,
            "type": 24,
            "bgcolor": 'rgba(255,255,255,0)',
            "edu_target": 1,
            "audioBtn": {
                "path": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/stem6.mp3",
                "url": require('./images/common/icon_play.png'),
                "width": 148,
                "height": 163,
                "x": 1722,
                "y": 11,
                "pic": require('./images/common/icon_done.png'),
                "txt": "播放"
            },
            "stem": {
                "url": require('./images/learn4/stem.png'),
                "text": "按顺序拖拽文字到图中，理解朱元璋名字的含义 ",
                "width": 903,
                "height": 70,
                "x": 803,
                "y": 57,
            },
            "processBar": {
                "url": require('./images/learn4/process.png'),
                "width": 1920,
                "height": 10,
                "x": 0,
                "y": 0,
                "txt": "进度条"
            },
            "piclist": [
                {
                    "url": require('./images/common/icon_learn.png'),
                    "width": 219,
                    "height": 104,
                    "x": 136,
                    "y": 35
                },
                {
                    "url": require('./images/common/bg.jpg'),
                    "width": 1920,
                    "height": 280,
                    "x": 0,
                    "y": 800,
                },
            ],
            "targetPic": [
                {
                    "width": 1380,
                    "height": 644,
                    "x": 270,
                    "y": 143,
                    "list": [
                        require('./images/learn4/m1.png'),
                        require('./images/learn4/m2.png'),
                        require('./images/learn4/m3.png'),
                        require('./images/learn4/m4.png'),
                    ]
                }
            ],
            "blankNum": 2,
            "answer": [[0, 1, 2]],
            "no_answer": [],
            "groupNum": 1,
            "optlist": [
                {
                    "sid": 0,
                    "txt": "朱",
                    "group": 0,
                    "value": 0,
                    "url": require('./images/learn4/a1.png'),
                    "width": 659,
                    "height": 116,
                    "x": 360,
                    "y": 823,
                    "zIndex": 5,
                    "target": [{ "width": 1380, "height": 644, "x": 270, "y": 143, }]
                },
                {
                    "sid": 1,
                    "txt": "元",
                    "group": 0,
                    "value": 1,
                    "url": require('./images/learn4/a2.png'),
                    "width": 470,
                    "height": 116,
                    "x": 1090,
                    "y": 823,
                    "zIndex": 5,
                    "target": [{ "width": 1380, "height": 644, "x": 270, "y": 143, }]
                },
                {
                    "sid": 2,
                    "txt": "璋",
                    "group": 0,
                    "value": 2,
                    "url": require('./images/learn4/a3.png'),
                    "width": 739,
                    "height": 116,
                    "x": 360,
                    "y": 955,
                    "zIndex": 5,
                    "target": [{ "width": 1380, "height": 644, "x": 270, "y": 143, }]
                },
            ],
            "explain": [
                {
                    "url": require('./images/learn4/explain.png'),
                    "width": 1004,
                    "height": 88,
                    "x": 205,
                    "y": 892,
                },
            ],
            "sentenceAudio": {
                "url": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/explain3.mp3",
                "timedown": 3.5
            },
            "thumbUp": {
                "url": require('./images/common/state_right.png'),
                "width": 151,
                "height": 94,
                "x": 0,
                "y": 557,
                "txt": "对了"
            },
            "btnNext": {
                "text": "下一步",
                "url": require('./images/common/btn_next.png'),
                "width": 224,
                "height": 94,
                "x": 1610,
                "y": 910,
            },
        },
    ],

    [
        {
            "id": 13,
            "type": 25,
            "bgcolor": "rgba(0,0,0,0)",
            "btnType": 'exam',
            "optlist": [
                {
                    "sid": 0,
                    "value": 1,
                    "txt": "忽必烈",
                    "url": require('./images/card/card41.png'),
                    "width": 300,
                    "height": 493,
                    "x": 395,
                    "y": 160,
                },
                {
                    "sid": 1,
                    "value": 1,
                    "txt": "朱元璋",
                    "url": require('./images/card/card42.png'),
                    "width": 300,
                    "height": 493,
                    "x": 810,
                    "y": 160,
                },
                {
                    "sid": 2,
                    "value": 1,
                    "txt": "马可·波罗",
                    "url": require('./images/card/card43.png'),
                    "width": 300,
                    "height": 493,
                    "x": 1225,
                    "y": 160,
                },
            ],
            "btnNext": {
                "text": "下一步",
                "url": require('./images/common/btn_exam.png'),
                "width": 248,
                "height": 109,
                "x": 836,
                "y": 810,
            },
        },
        {
            "id": 14,
            "type": 8,
            "bgcolor": "rgba(0,0,0,0)",
            "audioBtn": {
                "path": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/stem3.mp3",
                "url": require('./images/common/icon_play.png'),
                "width": 148,
                "height": 163,
                "x": 1722,
                "y": 11,
                "pic": require('./images/common/icon_done.png'),
                "txt": "播放"
            },
            "stem": {
                "url": require('./images/exam7/stem.png'),
                "text": "拖拽正确的选项到合适位置",
                "width": 563,
                "height": 70,
                "x": 1144,
                "y": 57,
            },
            "processBar": {
                "url": require('./images/exam7/process.png'),
                "width": 1920,
                "height": 10,
                "x": 0,
                "y": 0,
                "txt": "进度条"
            },
            "piclist": [
                {
                    "url": require('./images/common/icon_exam.png'),
                    "width": 227,
                    "height": 112,
                    "x": 132,
                    "y": 35
                },
                {
                    "url": require('./images/common/bg.jpg'),
                    "width": 1920,
                    "height": 280,
                    "x": 0,
                    "y": 800
                },
            ],
            "blankArea": {
                "url": require('./images/exam7/blank_area.png'),
                "width": 918,
                "height": 590,
                "x": 501,
                "y": 162,
                "zIndex": 1,
                "txt": "元朝的开创者是忽必烈"
            },
            "blankNum": 3,
            "answer": [[1, 3]],
            get blankList() {
                return this.optlist.reduce((r, i) => [...r, ...i.target], [])
            },
            "optlist": [
                {
                    "sid": 0,
                    "txt": "宋太宗赵光义",
                    "value": 1,
                    "url": require('./images/exam7/a1.png'),
                    ...getXYWH(297, 883, 490, 115),
                    "zIndex": 3,
                    "target": []
                },
                {
                    "sid": 1,
                    "txt": "忽必烈",
                    "value": 1,
                    "url": require('./images/exam7/a2.png'),
                    ...getXYWH(849, 883, 234, 115),
                    "zIndex": 3,
                    "target": [getXYWH(1138, 643, 234, 115, true)]
                },
                {
                    "sid": 2,
                    "txt": "南宋",
                    "value": 1,
                    "url": require('./images/exam7/a3.png'),
                    ...getXYWH(1153, 883, 203, 115),
                    "zIndex": 3,
                    "target": []
                },
                {
                    "sid": 3,
                    "txt": "元朝",
                    "value": 1,
                    "url": require('./images/exam7/a4.png'),
                    ...getXYWH(1423, 883, 203, 115),
                    "zIndex": 3,
                    "target": [getXYWH(501, 643, 234, 115, true)]
                },
            ],
            "sentenceAudio": {
                "url": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/result7.mp3",
                "timedown": 3
            },
            "btnNext": {
                "text": "下一步",
                "url": require('./images/common/btn_next.png'),
                "width": 224,
                "height": 94,
                "x": 1610,
                "y": 910,
            },
            "hasRank": true
        },
        {
            "id": 17,
            "type": 8,
            "bgcolor": "rgba(0,0,0,0)",
            "audioBtn": {
                "path": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/stem7.mp3",
                "url": require('./images/common/icon_play.png'),
                "width": 148,
                "height": 163,
                "x": 1722,
                "y": 11,
                "pic": require('./images/common/icon_done.png'),
                "txt": "播放"
            },
            "stem": {
                "url": require('./images/exam8/stem.png'),
                "text": "拖动和下方人物相关的描述到图中",
                ...getXYWH(1022, 57, 685, 70)
            },
            "processBar": {
                "url": require('./images/exam8/process.png'),
                "width": 1920,
                "height": 10,
                "x": 0,
                "y": 0,
                "txt": "进度条"
            },
            "piclist": [
                {
                    "url": require('./images/common/icon_exam.png'),
                    "width": 227,
                    "height": 112,
                    "x": 132,
                    "y": 35
                },
                {
                    "url": require('./images/common/bg.jpg'),
                    "width": 1920,
                    "height": 280,
                    "x": 0,
                    "y": 800
                },
            ],
            "blankArea": {
                "url": require('./images/exam8/blank_area.png'),
                ...getXYWH(549, 164, 822, 593),
                "zIndex": 1,
                "txt": "朱元璋"
            },
            "blankNum": 3,
            "answer": [[1, 2, 4]],
            get blankList() {
                return this.optlist.reduce((r, i) => [...r, ...i.target], [])
            },
            "optlist": [
                {
                    "sid": 0,
                    "txt": "朱五四",
                    "value": 1,
                    "url": require('./images/exam8/a1.png'),
                    ...getXYWH(210, 895, 212, 96),
                    "zIndex": 3,
                    "target": []
                },
                {
                    "sid": 1,
                    "txt": "朱重八",
                    "value": 1,
                    "url": require('./images/exam8/a2.png'),
                    ...getXYWH(445, 895, 226, 96),
                    "zIndex": 3,
                    "target": [getXYWH(1078, 263, 226, 96, true)]
                },
                {
                    "sid": 2,
                    "txt": "建立明朝",
                    "value": 1,
                    "url": require('./images/exam8/a3.png'),
                    ...getXYWH(694, 895, 286, 96),
                    "zIndex": 3,
                    "target": [getXYWH(1078, 566, 286, 96, true)]
                },
                {
                    "sid": 3,
                    "txt": "推翻南宋政权",
                    "value": 1,
                    "url": require('./images/exam8/a4.png'),
                    ...getXYWH(1003, 895, 442, 96),
                    "zIndex": 3,
                    "target": []
                },
                {
                    "sid": 4,
                    "txt": "推翻元朝",
                    "value": 1,
                    "url": require('./images/exam8/a5.png'),
                    ...getXYWH(1468, 895, 294, 96),
                    "zIndex": 3,
                    "target": [getXYWH(1078, 414, 294, 96, true)]
                },
            ],
            "btnNext": {
                "text": "下一步",
                "url": require('./images/common/btn_next.png'),
                "width": 224,
                "height": 94,
                "x": 1610,
                "y": 910,
            },
            "hasRank": true
        },
        {
            "id": 17,
            "type": 8,
            "bgcolor": "rgba(0,0,0,0)",
            "audioBtn": {
                "path": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/stem7.mp3",
                "url": require('./images/common/icon_play.png'),
                "width": 148,
                "height": 163,
                "x": 1722,
                "y": 11,
                "pic": require('./images/common/icon_done.png'),
                "txt": "播放"
            },
            "stem": {
                "url": require('./images/exam8/stem.png'),
                "text": "拖动和下方人物相关的描述到图中",
                ...getXYWH(1022, 57, 685, 70)
            },
            "processBar": {
                "url": require('./images/exam9/process.png'),
                "width": 1920,
                "height": 10,
                "x": 0,
                "y": 0,
                "txt": "进度条"
            },
            "piclist": [
                {
                    "url": require('./images/common/icon_exam.png'),
                    "width": 227,
                    "height": 112,
                    "x": 132,
                    "y": 35
                },
                {
                    "url": require('./images/common/bg.jpg'),
                    "width": 1920,
                    "height": 280,
                    "x": 0,
                    "y": 800
                },
            ],
            "blankArea": {
                "url": require('./images/exam9/blank_area.png'),
                ...getXYWH(365, 214, 1191, 540),
                "zIndex": 1,
                "txt": "马克菠萝"
            },
            "blankNum": 3,
            "answer": [[0, 2, 3]],
            get blankList() {
                return this.optlist.reduce((r, i) => [...r, ...i.target], [])
            },
            "optlist": [
                {
                    "sid": 0,
                    "txt": "意大利",
                    "value": 1,
                    "url": require('./images/exam9/a1.png'),
                    ...getXYWH(207, 895, 212, 96),
                    "zIndex": 3,
                    "target": [getXYWH(1065, 265, 212, 96, true)]
                },
                {
                    "sid": 1,
                    "txt": "美国",
                    "value": 1,
                    "url": require('./images/exam9/a2.png'),
                    ...getXYWH(445, 895, 158, 96),
                    "zIndex": 3,
                    "target": []
                },
                {
                    "sid": 2,
                    "txt": "旅行家",
                    "value": 1,
                    "url": require('./images/exam9/a3.png'),
                    ...getXYWH(629, 895, 220, 96),
                    "zIndex": 3,
                    "target": [getXYWH(1067, 416, 220, 96, true)]
                },
                {
                    "sid": 3,
                    "txt": "马克菠萝游记",
                    "value": 1,
                    "url": require('./images/exam9/a4.png'),
                    ...getXYWH(875, 895, 491, 96),
                    "zIndex": 3,
                    "target": [getXYWH(1065, 567, 491, 96, true)]
                },
                {
                    "sid": 4,
                    "txt": "太平御览",
                    "value": 1,
                    "url": require('./images/exam9/a5.png'),
                    ...getXYWH(1392, 895, 333, 96),
                    "zIndex": 3,
                    "target": []
                },
            ],
            "btnNext": {
                "text": "下一步",
                "url": require('./images/common/btn_next.png'),
                "width": 224,
                "height": 94,
                "x": 1610,
                "y": 910,
            },
            "hasRank": true
        },
        {
            "id": 17,
            "type": 8,
            "bgcolor": "rgba(0,0,0,0)",
            "audioBtn": {
                "path": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/stem7.mp3",
                "url": require('./images/common/icon_play.png'),
                "width": 148,
                "height": 163,
                "x": 1722,
                "y": 11,
                "pic": require('./images/common/icon_done.png'),
                "txt": "播放"
            },
            "stem": {
                "url": require('./images/exam8/stem.png'),
                "text": "拖动和下方人物相关的描述到图中",
                ...getXYWH(1022, 57, 685, 70)
            },
            "processBar": {
                "url": require('./images/exam10/process.png'),
                "width": 1920,
                "height": 10,
                "x": 0,
                "y": 0,
                "txt": "进度条"
            },
            "piclist": [
                {
                    "url": require('./images/common/icon_exam.png'),
                    "width": 227,
                    "height": 112,
                    "x": 132,
                    "y": 35
                },
                {
                    "url": require('./images/common/bg.jpg'),
                    "width": 1920,
                    "height": 280,
                    "x": 0,
                    "y": 800
                },
            ],
            "blankArea": {
                "url": require('./images/exam10/blank_area.png'),
                ...getXYWH(594, 208, 772, 544),
                "zIndex": 1,
                "txt": "忽必烈"
            },
            "blankNum": 3,
            "answer": [[1, 2]],
            get blankList() {
                return this.optlist.reduce((r, i) => [...r, ...i.target], [])
            },
            "optlist": [

                {
                    "sid": 1,
                    "txt": "朱重八",
                    "value": 1,
                    "url": require('./images/exam10/a1.png'),
                    ...getXYWH(248, 895, 229, 96),
                    "zIndex": 3,
                    "target": []
                },
                {
                    "sid": 1,
                    "txt": "蒙古人",
                    "value": 1,
                    "url": require('./images/exam10/a2.png'),
                    ...getXYWH(517, 895, 229, 96),
                    "zIndex": 3,
                    "target": [getXYWH(1077, 347, 229, 96, true)]
                },
                {
                    "sid": 2,
                    "txt": "南宋人",
                    "value": 1,
                    "url": require('./images/exam10/a3.png'),
                    ...getXYWH(786, 895, 229, 96),
                    "zIndex": 3,
                    "target": []
                },
                {
                    "sid": 2,
                    "txt": "建立元朝",
                    "value": 1,
                    "url": require('./images/exam10/a4.png'),
                    ...getXYWH(1055, 895, 290, 96),
                    "zIndex": 3,
                    "target": [getXYWH(1077, 510, 290, 96, true)]
                },
                {
                    "sid": 2,
                    "txt": "建立明朝",
                    "value": 1,
                    "url": require('./images/exam10/a5.png'),
                    ...getXYWH(1385, 895, 290, 96),
                    "zIndex": 3,
                    "target": []
                },
            ],
            "btnNext": {
                "text": "下一步",
                "url": require('./images/common/btn_next.png'),
                "width": 224,
                "height": 94,
                "x": 1610,
                "y": 910,
            },
            "hasRank": true
        },
    ],

    [
        {
            "id": 18,
            "type": 25,
            "bgcolor": "rgba(0,0,0,0)",
            "btnType": 'exam',
            "optlist": [
                {
                    "sid": 0,
                    "value": 1,
                    "txt": "明",
                    "url": require('./images/card/card51.png'),
                    ...getXYWH(495, 100, 390, 641),
                },
                {
                    "sid": 0,
                    "value": 1,
                    "txt": "元",
                    "url": require('./images/card/card52.png'),
                    ...getXYWH(1015, 100, 390, 641),
                },
            ],
            "btnNext": {
                "text": "下一步",
                "url": require('./images/common/btn_exam.png'),
                "width": 248,
                "height": 109,
                "x": 836,
                "y": 810,
            },
        },
        {
            "id": 19,
            "type": 15,
            "bgcolor": "rgba(0,0,0,0)",
            "audioBtn": {
                "path": "http://test.txbimg.com/RN_chinese/ReactNative/sheet/audio/stem8.mp3",
                "url": require('./images/common/icon_play.png'),
                "width": 148,
                "height": 163,
                "x": 1722,
                "y": 11,
                "pic": require('./images/common/icon_done.png'),
                "txt": "播放"
            },
            "stem": {
                "url": require('./images/exam11/stem.png'),
                "text": "将正确元素拖拽到合适位置",
                ...getXYWH(1171, 57, 536, 70),
            },
            "processBar": {
                "url": require('./images/exam11/process.png'),
                "width": 1920,
                "height": 10,
                "x": 0,
                "y": 0,
                "txt": "进度条"
            },
            "piclist": [
                {
                    "url": require('./images/common/icon_exam.png'),
                    "width": 227,
                    "height": 112,
                    "x": 132,
                    "y": 35
                },
                {
                    "url": require('./images/exam11/bg.png'),
                    "width": 1920,
                    "height": 306,
                    "x": 0,
                    "y": 774
                },
            ],
            "blankArea": {
                "url": require('./images/exam11/blank_area.png'),
                ...getXYWH(77, 183, 1766, 523),
                "zIndex": 1,
                "txt": "元明"
            },
            "blankNum": 2,
            "answer": [[1, 2, 3, 4, 6]],
            get blankList() {
                return this.optlist.reduce((r, i) => [...r, ...i.enterTarget], [])
            },
            "optlist": [
                {
                    "sid": 0,
                    "txt": "金国",
                    "value": 1,
                    "url": require('./images/exam11/a1.png'),
                    ...getXYWH(555, 796, 147, 95),
                    "zIndex": 3,
                    "pic": null,
                    "target": [],
                    "enterTarget": []
                },
                {
                    "sid": 1,
                    "txt": "南宋",
                    "value": 1,
                    "url": require('./images/exam11/a2.png'),
                    ...getXYWH(772, 796, 147, 95),
                    "zIndex": 3,
                    "target": [],
                    "pic": null,
                    get target() {
                        return this.enterTarget;
                    },
                    "enterTarget": [getXYWH(655, 604, 147, 95, true)],
                },
                {
                    "sid": 2,
                    "txt": "明朝",
                    "value": 1,
                    "url": require('./images/exam11/a3.png'),
                    ...getXYWH(984, 796, 159, 95),
                    "zIndex": 3,
                    "target": [],
                    "pic": null,
                    get target() {
                        return this.enterTarget;
                    },
                    "enterTarget": [getXYWH(1379, 542, 159, 95, true)],
                },
                {
                    "sid": 3,
                    "txt": "元朝",
                    "value": 1,
                    "url": require('./images/exam11/a4.png'),
                    ...getXYWH(1206, 796, 159, 95),
                    "zIndex": 3,
                    "target": [],
                    "pic": null,
                    get target() {
                        return this.enterTarget;
                    },
                    "enterTarget": [getXYWH(960, 542, 159, 95, true)],
                },
                {
                    "sid": 4,
                    "txt": "朱元璋",
                    "value": 1,
                    "url": require('./images/exam11/a5.png'),
                    ...getXYWH(401, 928, 251, 100),
                    "zIndex": 3,
                    "target": [],
                    "pic": require('./images/exam11/m2.png'),
                    "target": [getXYWH(1332, 183, 251, 301, true)],
                    "enterTarget": [getXYWH(1333, 386, 249, 92, true)]
                },
                {
                    "sid": 5,
                    "txt": "宋太宗赵匡胤",
                    "value": 1,
                    "url": require('./images/exam11/a6.png'),
                    ...getXYWH(707, 928, 504, 94),
                    "zIndex": 3,
                    "target": [],
                    "pic": null,
                    "target": [],
                    "enterTarget": []
                },
                {
                    "sid": 6,
                    "txt": "忽必烈",
                    "value": 1,
                    "url": require('./images/exam11/a7.png'),
                    ...getXYWH(1268, 928, 251, 100),
                    "zIndex": 3,
                    "target": [],
                    "pic": require('./images/exam11/m1.png'),
                    "target": [getXYWH(914, 184, 251, 300, true)],
                    "enterTarget": [getXYWH(916, 386, 249, 92, true)]
                },
            ],
            "btnNext": {
                "text": "下一步",
                "url": require('./images/common/btn_next.png'),
                "width": 224,
                "height": 94,
                "x": 1610,
                "y": 910,
            },
            "hasRank": true
        }
    ]
];

function getXYWH(x, y, width, height, isOneLine = false) {
    return isOneLine ?
        { width, height, x, y } :
        {
            width,
            height,
            x,
            y
        };
}
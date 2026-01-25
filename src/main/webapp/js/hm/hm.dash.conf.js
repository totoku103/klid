/**
 * 파일설명 : 대시보드 전역 설정파일
 */

define(function (require) {
    var env = {
        stageW: 1920,
        stageH: 1080
    };
    var refreshTime = 20 * 1000;
    var cyberAlertText = {
        //level1: '정상',
        level1: '관심',
        level2: '주의',
        level3: '경계',
        level4: '심각'
    };
    var cyberAlertColor = {
        //2023.04.27 경보등급 5->4단계 변경
        //level1: '#47CFC7',
        level1: '#5091BA',
        level2: '#FFC500',
        level3: '#EE7C37',
        level4: '#EB2549'
    };

    // 17개 시도 좌표값
    var dashLoc = {
        // 서울
        Local_10: [
            {instCd:6110000 , name: "",    x:305,y:300},
            {instCd:3000000  ,name: "",  x:170,y:0},
            {instCd:3010000  ,name: "",  x:310,y:390},
            {instCd:3020000  ,name: "",  x:290,y:478},
            {instCd:3030000  ,name: "",  x:340,y:770},
            {instCd:3040000  ,name: "",  x:510,y:770},
            {instCd:3050000  ,name: "",  x:510,y:0},
            {instCd:3060000  ,name: "",  x:483,y:305},
            {instCd:3070000  ,name: "",  x:340,y:0},
            {instCd:3080000  ,name: "",  x:305,y:207},
            {instCd:3090000  ,name: "",  x:305,y:113},
            {instCd:3100000  ,name: "",  x:464,y:187},
            {instCd:3110000  ,name: "",  x:150,y:223},
            {instCd:3120000  ,name: "",x:0,y:0},
            {instCd:3130000  ,name: "", x:145,y:435},
            {instCd:3140000  ,name: "", x:0,y:440},
            {instCd:3150000  ,name: "", x:0,y:340},
            {instCd:3160000  ,name: "", x:0,y:570},
            {instCd:3170000  ,name: "", x:170,y:770},
            {instCd:3180000 , name: "",x:0,y:770},
            {instCd:3190000  ,name: "",x:196,y:570},
            {instCd:3200000  ,name: "", x:197,y:660},
            {instCd:3210000  ,name: "", x:350,y:660},
            {instCd:3220000  ,name: "",  x:350,y:570},
            {instCd:3230000  ,name: "",  x:510,y:536},
            {instCd:3240000  ,name: "",  x:510,y:405}

        ],
        // 부산
        Local_20: [
            {instCd:6260000,name: "",    x:130,y:190}, // 본청
            {instCd:3250000,name: "",    x:170,y:770},
            {instCd:3260000,name: "",    x:40,y:651}, // 서구
            {instCd:3270000,name: "",    x:340,y:770},
            {instCd:3280000,name: "",   x:336,y:610},
            {instCd:3290000,name: "", x:0,y:316}, // 부산진구
            {instCd:3300000,name: "",   x:299,y:72}, // 동래구
            {instCd:3310000,name: "",    x:363,y:502},
            {instCd:3320000,name: "",    x:160,y:330},
            {instCd:3330000,name: "", x:433,y:362}, // 동래구
            {instCd:3340000,name: "",  x:135,y:565},
            {instCd:3350000,name: "",  x:277,y:210},
            {instCd:3360000,name: "",  x:0,y:464},
            {instCd:3370000,name: "",  x:510,y:0},
            {instCd:3380000,name: "",  x:510,y:485}, // 수영구
            {instCd:3390000,name: "",  x:157,y:444},
            {instCd:3400000,name: "",  x:483,y:210},
        ],
        //대구
        Local_30: [
            {instCd:6270000,name: "", x:277,y:558}, //본청
            {instCd:3410000,name: "", x:277,y:446}, //중구
            {instCd:3420000,name: "", x:416,y:436}, //동구
            {instCd:3430000,name: "", x:135,y:508}, //서구
            {instCd:3440000,name: "", x:246,y:637}, //남구
            {instCd:3450000,name: "", x:135,y:406}, //북구
            { instCd:3460000,name: "",x:388,y:623}, //수성구
            { instCd:3470000,name: "",x:100,y:617}, //달서구
            { instCd:3480000,name: "",x:67,y:746}, //달성군
            { instCd:3480000,name: "",x:0,y:528}, //달성군2
            { instCd:5141000,name: "",x:286,y:243}, //2023.05.10 군위군 경북에서 대구로 이동 (신규로 추가된 박스)
        ],
        //인천
        Local_40: [
            {instCd:6280000,name: "", x:420,y:460},
            // {instCd:2900000,name: "송도경제자유구역청", x:0,y:0}, //표현X, 본청에 카운팅 합산
            {instCd:3490000,name: "", x:206,y:447}, // 중구
            {instCd:3500000,name: "", x:243,y:357}, // 동구
            {instCd:3510000,name: "", x:274,y:537}, // 미추홀구
            {instCd:3520000,name: "",x:275,y:632}, // 연수구
            {instCd:3530000,name: "",x:420,y:560}, // 남동구
            {instCd:3540000,name: "",x:387,y:346}, // 부평구
            {instCd:3550000,name: "",x:420,y:246}, // 계양구
            {instCd:3560000,name: "", x:237,y:235}, // 서구
            {instCd:3570000,name: "",x:110,y:60}, // 강화군
            {instCd:3580000,name: "",x:120,y:664}, // 옹진군
        ],
        //광주
        Local_50: [
            {instCd:6290000,name: "", x:264,y:370},
            {instCd:3590000,name: "", x:495,y:520},
            {instCd:3600000,name: "", x:225,y:465},
            {instCd:3610000,name: "", x:317,y:593},
            {instCd:3620000,name: "", x:413,y:345},
            {instCd:3630000,name: "",x:92,y:330},
        ],
        //대전
        Local_60: [
            {instCd:6300000,name: "", x:240,y:418},
            {instCd:3640000,name: "", x:424,y:460},
            {instCd:3650000,name: "", x:290,y:576},
            {instCd:3660000,name: "", x:100,y:570},
            {instCd:3670000,name: "",x:58,y:340},
            {instCd:3680000,name: "",x:355,y:300},
        ],
        //울산
        Local_70: [
            {instCd:6310000,name: "", x:337,y:403},
            {instCd:3700000,name: "", x:356,y:500},
            {instCd:3710000,name: "", x:510,y:485},
            {instCd:3720000,name: "", x:490,y:270},
            {instCd:3730000,name: "",x:127,y:370},
            {instCd:3690000,name: "",x:316,y:304},
        ],
        //경기
        Local_80: [
            {instCd:6410000,name: "",    x:170,y:575},
            {instCd:3740000,name: "",   x:340,y:770},
            {instCd:3780000,name: "",   x:170,y:477},
            {instCd:3820000,name: "", x:340,y:295},
            {instCd:3830000,name: "",   x:170,y:0},
            {instCd:3860000,name: "",   x:0,y:295},
            {instCd:3900000,name: "",   x:0,y:0},
            {instCd:3910000,name: "",   x:170,y:672},
            {instCd:3920000,name: "", x:170,y:197},
            {instCd:3930000,name: "",   x:0,y:575},
            {instCd:3940000,name: "",   x:170,y:295},
            {instCd:3970000,name: "",   x:340,y:0},
            {instCd:3980000,name: "",   x:510,y:0},
            {instCd:3990000,name: "", x:510,y:197},
            {instCd:4000000,name: "",   x:510,y:770},
            {instCd:4010000,name: "",   x:0,y:477},
            {instCd:4020000,name: "",   x:0,y:770},
            {instCd:4030000,name: "",   x:170,y:770},
            {instCd:4040000,name: "",   x:340,y:477},
            {instCd:4050000,name: "",   x:340,y:575},
            {instCd:4060000,name: "",   x:0,y:98},
            {instCd:4070000,name: "",   x:510,y:672},
            {instCd:4080000,name: "",   x:340,y:672},
            {instCd:4090000,name: "",   x:0,y:197},
            {instCd:4110000,name: "",   x:510,y:575},
            {instCd:4140000,name: "",   x:170,y:98},
            {instCd:4160000,name: "",   x:510,y:98},
            {instCd:4170000,name: "",   x:510,y:295},
            {instCd:5530000,name: "",   x:0,y:672},
            {instCd:5540000,name: "",   x:510,y:477},
            {instCd:5590000,name: "",   x:340,y:197},
            {instCd:5600000,name: "",   x:340,y:98}
        ],
        //강원
        Local_90: [
            {instCd:6420000,name: "", x:148,y:253},
            { instCd:4180000,name: "",x:35,y:374},
            { instCd:4190000,name: "",x:119,y:685},
            { instCd:4200000,name: "",x:441,y:420},
            { instCd:4210000,name: "",x:490,y:518},
            { instCd:4220000,name: "",x:471,y:735},
            { instCd:4230000,name: "",x:379,y:205},
            { instCd:4240000,name: "",x:511,y:628},
            { instCd:4250000,name: "",x:192,y:436},
            { instCd:4260000,name: "",x:159,y:532},
            { instCd:4270000,name: "",x:314,y:735},
            { instCd:4280000,name: "",x:322,y:532},
            { instCd:4290000,name: "",x:347,y:629},
            { instCd:4300000,name: "",x:0,y:161},
            { instCd:4310000,name: "",x:0,y:273},
            { instCd:4320000,name: "",x:160,y:153},
            { instCd:4330000,name: "",x:270,y:341},
            { instCd:4340000,name: "",x:308,y:62},
            { instCd:4350000,name: "",x:416,y:302},
        ],
        //충북
        Local_100: [
            {instCd:6430000,name: "", x:148,y:441},
            { instCd:4360000,name: "",x:0,y:370},
            { instCd:4390000,name: "",x:229,y:209},
            { instCd:4400000,name: "",x:377,y:148},
            // { instCd:4410000,name: "",x:0,y:480}, //2022.06.15 청원군 제외
            { instCd:4420000,name: "",x:226,y:537},
            { instCd:4430000,name: "",x:77,y:621},
            { instCd:4440000,name: "",x:218,y:721},
            { instCd:4450000,name: "",x:0,y:257},
            { instCd:4460000,name: "",x:297,y:377},
            { instCd:4470000,name: "",x:81,y:160},
            { instCd:4480000,name: "",x:478,y:250},
            { instCd:5570000,name: "",x:148,y:307},
        ],
        //충남
        Local_110: [
            { instCd:6440000,name: "", x:114,y:357},
            { instCd:4490000,name: "",x:447,y:305},
            { instCd:4500000,name: "",x:414,y:447},
            { instCd:4510000,name: "",x:59,y:555},
            { instCd:4520000,name: "",x:297,y:244},
            { instCd:4530000,name: "",x:143,y:263},
            { instCd:4540000,name: "",x:352,y:639},
            { instCd:4550000,name: "",x:498,y:696},
            // { instCd:4560000,name: "",x:0,y:0}, // 연기군
            { instCd:4570000,name: "",x:206,y:597},
            { instCd:4580000,name: "",x:119,y:700},
            { instCd:4590000,name: "",x:264,y:501},
            { instCd:4600000,name: "",x:115,y:454},
            { instCd:4610000,name: "",x:264,y:372},
            { instCd:4620000,name: "",x:0,y:202},
            { instCd:4630000,name: "",x:170,y:140},
            { instCd:5580000,name: "",x:460,y:545},
        ],
        //전북
        Local_120: [
            {instCd:6450000,name: "", x:172,y:323},
            { instCd:4640000,name: "",x:318,y:409},
            { instCd:4670000,name: "",x:20,y:256},
            { instCd:4680000,name: "",x:178,y:210},
            { instCd:4690000,name: "",x:166,y:519},
            { instCd:4700000,name: "",x:414,y:638},
            { instCd:4710000,name: "",x:153,y:422},
            { instCd:4720000,name: "",x:335,y:203},
            { instCd:4730000,name: "",x:363,y:309},
            { instCd:4740000,name: "",x:509,y:256},
            { instCd:4750000,name: "",x:482,y:469},
            { instCd:4760000,name: "",x:319,y:518},
            { instCd:4770000,name: "",x:187,y:626},
            { instCd:4780000,name: "",x:30,y:616},
            { instCd:4790000,name: "",x:0,y:409}
        ],
        //전남
        Local_130: [
            {instCd:6460000,name: "", x:183,y:420},
            { instCd:4800000,name: "",x:12,y:770},
            { instCd:4810000,name: "",x:508,y:468},
            { instCd:4820000,name: "",x:510,y:0},
            { instCd:4830000,name: "",x:207,y:307},
            { instCd:4840000,name: "",x:509,y:282},
            { instCd:4850000,name: "",x:341,y:160},
            { instCd:4860000,name: "",x:344,y:0},
            { instCd:4870000,name: "",x:510,y:172},
            { instCd:4880000,name: "",x:363,y:520},
            { instCd:4890000,name: "",x:387,y:377},
            { instCd:4900000,name: "",x:352,y:283},
            { instCd:4910000,name: "",x:339,y:770},
            { instCd:4920000,name: "",x:175,y:770},
            { instCd:4930000,name: "",x:184,y:538},
            { instCd:4940000,name: "",x:498,y:770},
            { instCd:4950000,name: "",x:178,y:0},
            { instCd:4960000,name: "",x:12,y:0},
            { instCd:4970000,name: "",x:43,y:166},
            { instCd:4980000,name: "",x:201,y:142},
            { instCd:4990000,name: "",x:196,y:637},
            { instCd:5000000,name: "",x:0,y:585},
            { instCd:5010000,name: "",x:0,y:381},
        ],
        //경북
        Local_140: [
            {instCd:6470000,name: "",  x:154,y:255},
            { instCd:5020000,name: "",x:498,y:444},
            { instCd:5050000,name: "",x:498,y:614},
            { instCd:5060000,name: "",x:0,y:489},
            { instCd:5070000,name: "",x:302,y:209},
            { instCd:5080000,name: "",x:152,y:461},
            { instCd:5090000,name: "",x:186,y:54},
            { instCd:5100000,name: "",x:344,y:517},
            { instCd:5110000,name: "",x:0,y:344},
            { instCd:5120000,name: "",x:0,y:178},
            { instCd:5130000,name: "",x:343,y:623},
            //{ instCd:5140000,name: "",x:303,y:420},   //2023.05.11 군위군 경북->대구로 변경
            { instCd:5150000,name: "",x:154,y:353},
            { instCd:5160000,name: "",x:343,y:316},
            { instCd:5170000,name: "",x:462,y:189},
            { instCd:5180000,name: "",x:509,y:314},
            { instCd:5190000,name: "",x:232,y:722},
            { instCd:5200000,name: "",x:38,y:685},
            { instCd:5210000,name: "",x:32,y:585},
            { instCd:5220000,name: "",x:186,y:557},
            { instCd:5230000,name: "",x:154,y:152},
            { instCd:5240000,name: "",x:339,y:68},
            { instCd:5250000,name: "",x:508,y:28},
            { instCd:5260000,name: "",x:451,y:762},
        ],
        //경남
        Local_150: [
            {instCd:6480000,name: "", x:340,y:387},
            { instCd:5270000,name: "",x:340,y:523},
            //{ instCd:5280000,name: "",x:287,y:495},
            { instCd:5310000,name: "",x:173,y:406},
            //{ instCd:5320000,name: "",x:428,y:595},
            { instCd:5330000,name: "",x:225,y:660},
            { instCd:5340000,name: "",x:0,y:560},
            { instCd:5350000,name: "",x:496,y:413},
            { instCd:5360000,name: "",x:471,y:180},
            { instCd:5370000,name: "",x:392,y:686},
            { instCd:5380000,name: "",x:510,y:292},
            { instCd:5390000,name: "",x:184,y:300},
            { instCd:5400000,name: "",x:340,y:292},
            { instCd:5410000,name: "",x:319,y:175},
            { instCd:5420000,name: "",x:136,y:528},
            { instCd:5430000,name: "",x:52,y:680},
            { instCd:5440000,name: "",x:12,y:442},
            { instCd:5450000,name: "",x:12,y:319},
            { instCd:5460000,name: "",x:0,y:183},
            { instCd:5470000,name: "",x:31,y:80},
            { instCd:5480000,name: "",x:159,y:183},
        ],
        //제주
        Local_160: [
            {instCd:6500000,name: "", x:203,y:329},
            {instCd:6510000,name: "", x:378,y:258},
            {instCd:6520000,name: "",x:290,y:514},
        ],
        //세종
        Local_170: [
            {instCd:5690000, name: "", x:290,y:473},
        ],


        // 운영자용 관제실
        Admctrl_Map: [
            {localCd: 1, name: 'KLID', x: 150, y: 90},
            {localCd: 10, name: '서울', x: 150, y: 185},
            {localCd: 20, name: '부산', x: 535, y: 715},
            {localCd: 30, name: '대구', x: 335, y: 550},
            {localCd: 40, name: '인천', x: 20, y: 124},
            {localCd: 50, name: '광주', x: 20, y: 695},
            {localCd: 60, name: '대전', x: 150, y: 490},
            {localCd: 70, name: '울산', x: 534, y: 605},
            {localCd: 80, name: '경기', x: 150, y: 285},
            {localCd: 90, name: '강원', x: 360, y: 124},
            {localCd: 100, name: '충북', x: 288, y: 400},
            {localCd: 110, name: '충남', x: 20, y: 400},
            {localCd: 120, name: '전북', x: 20, y: 566},
            {localCd: 130, name: '전남', x: 150, y: 767},
            {localCd: 140, name: '경북', x: 425, y: 400},
            {localCd: 150, name: '경남', x: 335, y: 656},
            {localCd: 160, name: '제주', x: 150, y: 882},
            {localCd: 170, name: '세종', x: 150, y: 400}
        ],

        // 운영자용 브리핑용
        AdminBrefing_Map: [
            {localCd: 1, name: 'KLID', x: 370, y: 0, widgetType: 'R'}, // (L)eft or (R)ight
            {localCd: 10, name: '서울특별시', x: 0, y: 0, widgetType: 'L'}, // (L)eft or (R)ight
            {localCd: 40, name: '인천광역시', x: 0, y: 97, widgetType: 'L'},
            {localCd: 80, name: '경기도', x: 0, y: 194, widgetType: 'L'},
            {localCd: 170, name: '세종특별자치시', x: 0, y: 291, widgetType: 'L'},
            {localCd: 60, name: '대전광역시', x: 0, y: 387, widgetType: 'L'},
            {localCd: 120, name: '전라북도', x: 0, y: 485, widgetType: 'L'},
            {localCd: 50, name: '광주광역시', x: 0, y: 581, widgetType: 'L'},
            {localCd: 130, name: '전라남도', x: 0, y: 678, widgetType: 'L'},
            {localCd: 90, name: '강원도', x: 986, y: 0, widgetType: 'R'},
            {localCd: 100, name: '충청북도', x: 986, y: 97, widgetType: 'R'},
            {localCd: 110, name: '충청남도', x: 986, y: 194, widgetType: 'R'},
            {localCd: 140, name: '경상북도', x: 986, y: 291, widgetType: 'R'},
            {localCd: 30, name: '대구광역시', x: 986, y: 387, widgetType: 'R'},
            {localCd: 150, name: '경상남도', x: 986, y: 485, widgetType: 'R'},
            {localCd: 70, name: '울산광역시', x: 986, y: 581, widgetType: 'R'},
            {localCd: 20, name: '부산광역시', x: 986, y: 678, widgetType: 'R'},
            {localCd: 160, name: '제주특별자치도', x: 492, y: 822, widgetType: 'R'}
        ],

        //장애 버블 색상
        // 초록색 ( 선,면 :#ff0000 , 선 투명도 : 90%, 면 투명도 : 50% )
        // 빨간색 ( 선,면 :#1dff5d , 선 투명도 : 90%, 면 투명도 : 50% )

        // 대외용 관제실
        ExtControl_Map: [
            {countryCd: 1, countryNm: '한국', x: 566, y: 154 ,sort: 1},
            {countryCd: 223, countryNm: '미국', x: 1055, y: 134 ,sort: 1},
            {countryCd: 47, countryNm: '중국', x: 475, y: 164 ,sort: 1},
            {countryCd: 176, countryNm: '러시아', x: 514, y: 57 ,sort: 1},
            {countryCd: 69, countryNm: '독일', x: 120, y: 100 ,sort: 1},
            {countryCd: 66, countryNm: '일본', x: 630, y: 148 ,sort: 1},
            {countryCd: 84, countryNm: '홍콩', x: 520, y: 200 ,sort: 1},
            {countryCd: 79, countryNm: '프랑스', x: 90, y: 115,sort: 1},
            {countryCd: 151, countryNm: '네덜란드', x: 98, y: 95,sort: 1},
            {countryCd: 226, countryNm: '영국', x: 74, y: 93,sort: 1},
            {countryCd: 40, countryNm: '캐나다', x: 1030, y: 70,sort: 1},
            {countryCd: 32, countryNm: '브라질', x: 1200, y: 296,sort: 1},
            {countryCd: 221, countryNm: '우크라이나', x: 203, y: 106,sort: 1},
            {countryCd: 209, countryNm: '태국', x: 460, y: 230,sort: 1},
            {countryCd: 216, countryNm: '터키', x: 215, y: 143,sort: 1},
            {countryCd: 206, countryNm: '대만', x: 538, y: 200,sort: 1},
            {countryCd: 114, countryNm: '인도네시아', x: 533, y: 297,sort: 1},
            {countryCd: 83, countryNm: '이태리', x: 130, y: 132,sort: 1},
            {countryCd: 15, countryNm: '오스트레일리아', x: 590, y: 382,sort: 1},
            {countryCd: 189, countryNm: '싱가포르', x: 472, y: 282,sort: 1},
            {countryCd: 170, countryNm: '폴란드', x: 156, y: 96,sort: 1},
            {countryCd: 195, countryNm: '스페인', x: 66, y: 140,sort: 1},
            {countryCd: 231, countryNm: '베트남', x: 490, y: 240,sort: 1},
            {countryCd: 175, countryNm: '루마니아', x: 176, y: 120,sort: 1},
            {countryCd: 86, countryNm: '인도', x: 375, y: 205,sort: 1},
            {countryCd: 124, countryNm: '리투아니아', x: 175, y: 85,sort: 1},
            {countryCd: 203, countryNm: '스웨덴', x: 143, y: 62,sort: 1},
            {countryCd: 171, countryNm: '포르투갈', x: 48, y: 142,sort: 1},
            {countryCd: 105, countryNm: '북한', x: 564, y: 140,sort: 1},
            {countryCd: 204, countryNm: '스위스', x: 111, y: 115,sort: 1},
            {countryCd: 139, countryNm: '멕시코', x: 1060, y: 200,sort: 1},
            {countryCd: 130, countryNm: '말레이시아', x: 465, y: 273,sort: 1},
            {countryCd: 168, countryNm: '필리핀', x: 543, y: 247,sort: 1},
            {countryCd: 95, countryNm: '덴마크', x: 118, y: 82,sort: 1},
            {countryCd: 98, countryNm: '체코', x: 140, y: 105,sort: 1}
        ],

        // 대외용 브리핑용
        ExtBrefing_Map: [
            {countryCd: 1, 	 countryNm: '한국', x: 847, y: 157		,sort: 1},
            {countryCd: 223, countryNm: '미국', x: 1585, y: 135		,sort: 1},
            {countryCd: 47,  countryNm: '중국', x: 708, y: 168		,sort: 1},
            {countryCd: 176, countryNm: '러시아', x: 722, y: 65		,sort: 1},
            {countryCd: 69,  countryNm: '독일', x: 170, y: 105		,sort: 1},
            {countryCd: 66,  countryNm: '일본', x: 937, y: 148		,sort: 1},
            {countryCd: 84,  countryNm: '홍콩', x: 774, y: 203		,sort: 1},
            {countryCd: 79,  countryNm: '프랑스', x: 125, y: 118		,sort: 1},
            {countryCd: 151, countryNm: '네덜란드', x: 147, y: 100	,sort: 1},
            {countryCd: 226, countryNm: '영국', x: 99, y: 94			,sort: 1},
            {countryCd: 40,  countryNm: '캐나다', x: 1542, y: 70		,sort: 1},
            {countryCd: 32,  countryNm: '브라질', x: 1804, y: 303		,sort: 1},
            {countryCd: 221, countryNm: '우크라이나', x: 302, y: 111  ,sort: 1},
            {countryCd: 209, countryNm: '태국', x: 686, y: 232		,sort: 1},
            {countryCd: 216, countryNm: '터키', x: 312, y: 145		,sort: 1},
            {countryCd: 206, countryNm: '대만', x: 802, y: 200		,sort: 1},
            {countryCd: 114, countryNm: '인도네시아', x: 795, y: 295	,sort: 1},
            {countryCd: 83,  countryNm: '이태리', x: 186, y: 133		,sort: 1},
            {countryCd: 15,  countryNm: '오스트레일리아', x: 878, y: 374	,sort: 1},
            {countryCd: 189, countryNm: '싱가포르', x: 702, y: 280		,sort: 1},
            {countryCd: 170, countryNm: '폴란드', x: 226, y: 100		,sort: 1},
            {countryCd: 195, countryNm: '스페인', x: 90, y: 142		,sort: 1},
            {countryCd: 231, countryNm: '베트남', x: 730, y: 240		,sort: 1},
            {countryCd: 175, countryNm: '루마니아', x: 260, y: 122	,sort: 1},
            {countryCd: 86,  countryNm: '인도', x: 554, y: 206		,sort: 1},
            {countryCd: 124, countryNm: '리투아니아', x: 253, y: 90	,sort: 1},
            {countryCd: 203, countryNm: '스웨덴', x: 211, y: 62		,sort: 1},
            {countryCd: 171, countryNm: '포르투갈', x: 64, y: 144		,sort: 1},
            {countryCd: 105, countryNm: '북한', x: 841, y: 145		,sort: 1},
            {countryCd: 204, countryNm: '스위스', x: 161, y: 118		,sort: 1},
            {countryCd: 139, countryNm: '멕시코', x: 1586, y: 192		,sort: 1},
            {countryCd: 130, countryNm: '말레이시아', x: 694, y: 272	,sort: 1},
            {countryCd: 168, countryNm: '필리핀', x: 814, y: 244		,sort: 1},
            {countryCd: 95,  countryNm: '덴마크', x: 170, y: 86		,sort: 1},
            {countryCd: 98,  countryNm: '체코', x: 198, y: 108		,sort: 1}
        ],
        //mois2 지역데이타.
        mois2ReginData:[
            {name: "서울", imgName: "Seoul", x: 420, y: 60, evtLevel: "" ,evtLevel2: "" , loCd: 10},
            {name: "인천", imgName: "Incheon", x: 310, y: 105, evtLevel: "", evtLevel2: "" ,loCd: 40},
            {name: "경기", imgName: "GyeongGi", x: 525, y: 120, evtLevel: "", evtLevel2: "" ,loCd: 80},
            {name: "강원", imgName: "Gangwon", x: 660, y: 53, evtLevel: "", evtLevel2: "" ,loCd: 90},
            {name: "충남", imgName: "Chungnam", x: 355, y: 265, evtLevel: "",evtLevel2: "" , loCd: 110},
            {name: "충북", imgName: "Chungbuk", x: 630, y: 230, evtLevel: "",evtLevel2: "" , loCd: 100},
            {name: "세종", imgName: "Sejong", x: 490, y: 280, evtLevel: "", evtLevel2: "" ,loCd: 170},
            {name: "경북", imgName: "Gyeongbuk", x: 770, y: 280, evtLevel: "",evtLevel2: "" , loCd: 140},
            {name: "대전", imgName: "Daejeon", x: 440, y: 415, evtLevel: "", evtLevel2: "" ,loCd: 60},
            {name: "대구", imgName: "Daegu", x: 715, y: 420, evtLevel: "", evtLevel2: "" ,loCd: 30},
            {name: "울산", imgName: "Ulsan", x: 855, y: 500, evtLevel: "",evtLevel2: "" , loCd: 70},
            {name: "부산", imgName: "Busan", x: 755, y: 595, evtLevel: "",evtLevel2: "" , loCd: 20},
            {name: "경남", imgName: "Gyeongnam", x: 600, y: 525, evtLevel: "",evtLevel2: "" , loCd: 150},
            {name: "전북", imgName: "Jeonbuk", x: 470, y: 550, evtLevel: "", evtLevel2: "" ,loCd: 120},
            {name: "전남", imgName: "Jeonnam", x: 448, y: 696, evtLevel: "",evtLevel2: "" , loCd: 130},
            {name: "광주", imgName: "Gwangju", x: 330, y: 560, evtLevel: "",evtLevel2: "" , loCd: 50},
            {name: "제주", imgName: "Jeju", x: 125, y: 735, evtLevel: "", evtLevel2: "" ,loCd: 160}
        ],
        //mois3 지역데이타.
        mois3RegionData:[
            {name: "서울", imgName: "Seoul", x: 542, y: 95, loCd: 10 , cnt1:0, cnt2:0, cnt3:0},
            {name: "인천", imgName: "Incheon", x: 378, y: 150, loCd: 40 , cnt1:0, cnt2:0, cnt3:0},
            {name: "경기", imgName: "GyeongGi", x: 592, y: 200, loCd: 80 , cnt1:0, cnt2:0, cnt3:0},
            {name: "강원", imgName: "Gangwon", x: 730, y: 93, loCd: 90 , cnt1:0, cnt2:0, cnt3:0},
            {name: "충남", imgName: "Chungnam", x: 380, y: 276, loCd: 110 , cnt1:0, cnt2:0, cnt3:0},
            {name: "충북", imgName: "Chungbuk", x: 755, y: 232, loCd: 100 , cnt1:0, cnt2:0, cnt3:0},
            {name: "세종", imgName: "Sejong", x: 590, y: 320, loCd: 170 , cnt1:0, cnt2:0, cnt3:0},
            {name: "경북", imgName: "Gyeongbuk", x: 871, y: 337, loCd: 140 , cnt1:0, cnt2:0, cnt3:0},
            {name: "대전", imgName: "Daejeon", x: 466, y: 415, loCd: 60 , cnt1:0, cnt2:0, cnt3:0},
            {name: "대구", imgName: "Daegu", x: 750, y: 460, loCd: 30, cnt1:0, cnt2:0, cnt3:0},
            {name: "울산", imgName: "Ulsan", x: 930, y: 530, loCd: 70 , cnt1:0, cnt2:0, cnt3:0},
            {name: "부산", imgName: "Busan", x: 914, y: 652, loCd: 20 , cnt1:0, cnt2:0, cnt3:0},
            {name: "경남", imgName: "Gyeongnam", x: 630, y: 555, loCd: 150 , cnt1:0, cnt2:0, cnt3:0},
            {name: "전북", imgName: "Jeonbuk", x: 466, y: 515, loCd: 120 , cnt1:0, cnt2:0, cnt3:0},
            {name: "전남", imgName: "Jeonnam", x: 380, y: 750, loCd: 130 , cnt1:0, cnt2:0, cnt3:0},
            {name: "광주", imgName: "Gwangju", x: 366, y: 620, loCd: 50 , cnt1:0, cnt2:0, cnt3:0},
            {name: "제주", imgName: "Jeju", x: 170, y: 775, loCd: 160 , cnt1:0, cnt2:0, cnt3:0}
        ]

    };

    var mois2CenterData = {
        centerData :[
            {name: "기획재정부", idx: "0", evtLevel: ""},
            {name: "교육부", idx: "1", evtLevel: ""},
            {name: "과학기술정보통신부", idx: "2", evtLevel: ""},
            {name: "외교부", idx: "3", evtLevel: ""},
            {name: "통일부", idx: "4", evtLevel: ""},
            {name: "법무부", idx: "5", evtLevel: ""},
            {name: "행정안전부", idx: "6", evtLevel: ""},
            {name: "문화체육관광부", idx: "7", evtLevel: ""},
            {name: "농림축산식품부", idx: "8", evtLevel: ""},
            {name: "산업통상자원부", idx: "9", evtLevel: ""},
            {name: "보건복지부", idx: "10", evtLevel: ""},
            {name: "환경부", idx: "11", evtLevel: ""},
            {name: "고용노동부", idx: "12", evtLevel: ""},
            {name: "국토교통부", idx: "13", evtLevel: ""},
            {name: "해양수산부", idx: "14", evtLevel: ""},
            {name: "국가보훈처", idx: "15", evtLevel: ""},
            {name: "인사혁신처", idx: "16", evtLevel: ""},
            {name: "법제처", idx: "17", evtLevel: ""},
            {name: "식품의약품안전처", idx: "18", evtLevel: ""},
            {name: "통계청", idx: "19", evtLevel: ""},
            {name: "대검찰청", idx: "20", evtLevel: ""},
            {name: "병무청", idx: "21", evtLevel: ""},
            {name: "경찰청", idx: "22", evtLevel: ""},
            {name: "소방청", idx: "23", evtLevel: ""},
            {name: "농촌진흥청", idx: "24", evtLevel: ""},
            {name: "산림청", idx: "25", evtLevel: ""},
            {name: "행정중심복합도시건설청", idx: "26", evtLevel: ""},
            {name: "해양경찰청", idx: "27", evtLevel: ""}
        ]
    }

    function getCyberAlertText(lvl) {
        return cyberAlertText['level' + lvl];
    }

    function getCyberAlertColor(lvl) {
        return cyberAlertColor['level' + lvl];
    }

    var animation = {

        // 타원 선을 흐르는 circle light
        lightCircleTransition: function(svg, target) {
            target
                .transition()
                .attr("display", "block")
                .duration(8000)
                .attrTween("transform", animation.circleRotation(svg.select("path.path").node(), 1))
                .on("end", function() {
                    animation.lightCircleTransition(svg, target);
                });
        },


        // 원반을 지나는 rect light
        lightRectTransition: function(target) {
            target.attr("transform", "translate(-100,0)")
                .transition()
                .duration(4000)
                .attr("transform", "translate(100,0)")
                .on("end", function repeat() {
                    animation.lightRectTransition(target);
                    // d3.select(this)
                    //     .attr("transform", "translate(-100,0)")
                    //     .transition()
                    //     .duration(4000)
                    //     .attr("transform", "translate(100,0)")
                    //     .on("end", repeat);
                });
        },

        circleRotation: function(path, direction) {
            if(path == null) return;
            var l = path.getTotalLength();
            return function(d, i, a) {
                return function(t) {
                    if(t > 0.5) { //reverse (t=0~1)
                        t = t - 0.5;
                    }
                    var atLength = direction === 1? (t * l) : (l - (t * l ));
                    // var atLength = l - (t * l );
                    var p1 = path.getPointAtLength(atLength),
                        p2 = path.getPointAtLength(atLength + direction),
                        angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
                    return "translate({0}, {1})rotate({2})".substitute(p1.x, p1.y, angle);
                }
            }
        },

        //깜빡임처리.
        playDisplayAnaimation: function (svg,d3) {
            this.stopDisplayAnimation(svg);

            // animation target
            var g = svg.filter(function(d) {return d.evt > 0; }),
                duration = 500;

            g.transition()
                .attr("display", 'block')
                .delay(duration)
                .transition()
                .attr("display", 'none')
                .delay(duration)
                .on("end", function repeat() {
                    d3.active(this)
                        .transition()
                        .attr("display", 'block')
                        .delay(duration)
                        .transition()
                        .attr("display", 'none')
                        .delay(duration)
                        .on("end", repeat);
                });
        },
        //깜빡임처리.
        stopDisplayAnimation: function (svg) {
            var g = svg.filter(function(d) { return d.evt > 0;});
            g.on("end", null);
        },

        playCircleAnimation: function (target, d3){
            var g = target,
                duration = 1000;
            g.transition()
                .attr("r",function(d, idx) {
                    return 5 + d.sort;
                })
                .duration(duration)
                .transition()
                .attr("r",function(d, idx) {
                    return Number(d3.select(this).attr("r"));
                })
                .duration(duration)
                .on("end", function repeat() {
                    g.transition()
                        .attr("r",function(d, idx) {
                            return 15 + d.sort;
                        })
                        .duration(duration)
                        .transition()
                        .attr("r",function(d, idx) {
                            return Number(d3.select(this).attr("r"));
                        })
                        .duration(duration)
                        .on("end", repeat);
                });
        }

    }

    //글자 흐르는 애니메이션
    function getMarquee() {
        $('.marquee').marquee({
            //speed in milliseconds of the marquee
            duration: 20000,
            //'left' or 'right'
            direction: 'left'
        });
        return
    }

    return {
        env: env,
        refreshTime: refreshTime,
        dashLoc: dashLoc,
        mois2CenterData: mois2CenterData,
        getCyberAlertText: getCyberAlertText,
        getCyberAlertColor: getCyberAlertColor,
        animation: animation,
        getMarquee:getMarquee
    };
});
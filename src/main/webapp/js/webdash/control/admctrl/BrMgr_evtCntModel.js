define(function (require) {
    function Exctrl_evtCntModel() {
        this.reset(); // 초기화
        this.resetChart(); // 초기화
    }
    Exctrl_evtCntModel.prototype = {
        reset: function () {
            this.inciData = [];
            this.tbzledgeData = [];
        },
        resetChart:function (){
            //웹해킹
            this.webhacking = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            //악성코드
            this.noService = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            //정보수집
            this.info = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


            this.todayCnt    = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.yesterdayCnt    = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.lastWeekCnt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        },

        getTodayCnt: function(){
            return this.todayCnt;
        },
        getYesterdayCnt: function(){
            return this.yesterdayCnt;
        },
        getLastWeekCnt: function(){
            return this.lastWeekCnt;
        },


        setChartData: function(dbData){
            //차트데이터 리셋
            this.resetChart();

            var todayCnt = 0;
            var yesterdayCnt = 0;
            var lastWeekCnt = 0;

            for(var i=0; i< dbData.yesterday.length; i++) {
                if(dbData.yesterday[i].length!=0) {
                    $.each(dbData.yesterday[i], function(key, value){
                        if(key!='regHh'){
                            yesterdayCnt += value;
                        }
                    })
                    this.yesterdayCnt[dbData.yesterday[i].regHh]=yesterdayCnt;
                    yesterdayCnt=0;
                }
            }

            for(var i=0; i< dbData.today.length; i++) {
                if(dbData.today[i].length!=0) {
                    $.each(dbData.today[i], function(key, value){
                        if(key!='regHh'){
                            todayCnt += value;
                        }
                    })
                    this.todayCnt[dbData.today[i].regHh]=todayCnt;
                    todayCnt=0;
                }
            }

            for(var i=0; i< dbData.lastWeek.length; i++) {
                if(dbData.lastWeek[i].length!=0) {
                    $.each(dbData.lastWeek[i], function(key, value){
                        if(key!='regHh'){
                            lastWeekCnt += value;
                        }
                    })
                    this.lastWeekCnt[dbData.lastWeek[i].regHh]=lastWeekCnt;
                    lastWeekCnt = 0;
                }
            }
         },


        setLocalChartData: function(dbData, localNm){
            this.resetChart();

            var todayCnt = 0;
            var yesterdayCnt = 0;
            var lastWeekCnt = 0;

            for(var i=0; i< dbData.yesterday.length; i++) {
                if(dbData.yesterday[i].length!=0) {
                    $.each(dbData.yesterday[i], function(key, value){
                        if(key!='regHh'){
                            yesterdayCnt += value;
                        }
                    })
                    this.yesterdayCnt[dbData.yesterday[i].regHh]=yesterdayCnt;
                    yesterdayCnt=0;
                }
            }

            for(var i=0; i< dbData.today.length; i++) {
                if(dbData.today[i].length!=0) {
                    $.each(dbData.today[i], function(key, value){
                        if(key!='regHh'){
                            todayCnt += value;
                        }
                    })
                    this.todayCnt[dbData.today[i].regHh]=todayCnt;
                    todayCnt=0;
                }
            }

            for(var i=0; i< dbData.lastWeek.length; i++) {
                if(dbData.lastWeek[i].length!=0) {
                    $.each(dbData.lastWeek[i], function(key, value){
                        if(key!='regHh'){
                            lastWeekCnt += value;
                        }
                    })
                    this.lastWeekCnt[dbData.lastWeek[i].regHh]=lastWeekCnt;
                    lastWeekCnt = 0;
                }
            }
        }

    };
    return Exctrl_evtCntModel;
});
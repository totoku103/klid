define(function (require) {
    function Exctrl_evtCntModel() {
        this.reset(); // 초기화
        this.resetChart(); // 초기화
    }
    Exctrl_evtCntModel.prototype = {
        reset: function () {
            this.inciData = [];
            this.tbzledgeData = [];
            //2019.08.19 추가 사고접수 유형별 집계카운트 추가
            this.inciTypeCnt = [];
        },
        resetChart:function (){
            //웹해킹
            this.webhacking = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            //악성코드
            this.ackcode = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            //비인가접근
            this.noAccess = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            //서비스거부
            this.noService = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            //정보수집
            this.info = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        },
        getInciData: function(){
            return this.inciData;
        },
        getTbzledgeData: function(){
            return this.tbzledgeData;
        },
        getWebhacking: function(){
            return this.webhacking;
        },
        getAckcode: function(){
            return this.ackcode;
        },
        getNoAccess: function(){
            return this.noAccess;
        },
        getNoService: function(){
            return this.noService;
        },
        getInfo: function(){
            return this.info;
        },
        getInciTypeCnt: function () {
            return this.inciTypeCnt;
        },
        setInciData: function(dbData) {
            this.inciData = dbData;
        },
        setTbzledgeData: function(dbData){
            var totalData = {type: '계', totalCnt: 0, processCnt: 0, completeCnt: 0};
            if(dbData.length) {
                $.each(dbData, function(idx, value) {
                    totalData.totalCnt += value.totalCnt;
                    totalData.completeCnt += value.completeCnt;
                    totalData.processCnt += value.processCnt;
                });
            }
            dbData.unshift(totalData);
            this.tbzledgeData = dbData;
        },
        setChartData: function(dbData){
            //차트데이터 리셋
            this.resetChart();

            //웹해킹
            var hecking = 0;
            //악성코드
            var ackcode = 0;
            //비인가접근
            var noAccess = 0;
            //서비스거부
            var noService = 0;
            //정보수집
            var info = 0;

            for (var i = 0; i < dbData.length; i++) {
                $.each(dbData[i], function(key, value){
                    if(key == "웹해킹"){
                        hecking = value;
                    }else if(key == "악성코드"){
                        ackcode = value;
                    }else if(key == "비인가접근"){
                        noAccess = value;
                    }else if(key == "서비스거부"){
                        noService = value;
                    }else if(key == "정보수집"){
                        info = value;
                    }
                });
                this.webhacking[dbData[i].regHh]+=hecking;
                this.ackcode[dbData[i].regHh]+=ackcode;
                this.noAccess[dbData[i].regHh]+=noAccess;
                this.noService[dbData[i].regHh]+=noService;
                this.info[dbData[i].regHh]+=info;
                hecking=0;
                ackcode=0;
                noAccess=0;
                noService=0;
                info=0;
            }
        },
        setInciTypeCnt: function(dbData){
            this.inciTypeCnt = dbData;
        }

    };
    return Exctrl_evtCntModel;
});
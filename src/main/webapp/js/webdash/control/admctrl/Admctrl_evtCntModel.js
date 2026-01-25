define(function (require) {

    function Admctrl_evtCntModel() {
        this.reset(); // 초기화
    }

    Admctrl_evtCntModel.prototype = {
        reset: function () {
            this.inciData = [];
            this.tbzledgeData = [];
        },

        getInciData: function(){
            return this.inciData;
        },

        getTbzledgeData: function(){
            return this.tbzledgeData;
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
        }
    };

    return Admctrl_evtCntModel;
});
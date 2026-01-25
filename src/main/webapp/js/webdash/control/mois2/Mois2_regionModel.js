define(function (require) {
    var hmDashConf = require('hmDashConf');

    function Mois2_regionModel() {
        this.reset(); // 초기화
    }

    Mois2_regionModel.prototype = {
        reset: function () {
            this.data = hmDashConf.dashLoc.mois2ReginData;
        },
        getData: function(){
            return this.data;
        },
        setData: function (regionData) {
            for (var i = 0; i < this.data.length; i++) {
                if(regionData.length >0) {
                    this.setDataById(this.data[i], regionData);
                }
            }
        },
        setData2: function (regionData) {
            for (var i = 0; i < this.data.length; i++) {
                if(regionData.length >0) {
                    this.setDataById2(this.data[i], regionData);
                }
            }
        },
        setDataById: function(value,value2) {
            for (var j = 0; j < value2.length; j++){
                if(value.loCd == value2[j].localCd){
                    if(value2[j].lastRes == '0'){ //정상
                        value.evtLevel = 1;
                    }else{//장애
                        value.evtLevel = 2;
                    }
                    break;
                }
            }
        },
        setDataById2: function(value,value2) {
            for (var j = 0; j < value2.length; j++){
                if(value.loCd == value2[j].localCd){
                    if(value2[j].lastRes == '0'){ //정상
                        value.evtLevel2 = 1;
                    }else{//장애
                        value.evtLevel2 = 2;
                    }
                    break;
                }
            }
        }
    };

    return Mois2_regionModel;
});
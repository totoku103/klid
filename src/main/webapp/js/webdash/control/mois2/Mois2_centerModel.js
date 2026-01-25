define(function (require) {
    var hmDashConf = require('hmDashConf');

    function Mois2_centerModel() {
        this.reset(); // 초기화
    }

    Mois2_centerModel.prototype = {
        reset: function () {
            this.data = hmDashConf.mois2CenterData.centerData;
        },
        getData: function(){
            return this.data;
        },
        setData: function (cebterData) {
            for (var i = 0; i < this.data.length; i++) {
                if(cebterData.length >0){
                    this.setDataById(this.data[i],cebterData);
                }
            }
        },
        setDataById: function(value,value2) {
            for (var j = 0; j < value2.length; j++){
                if(value.name == value2[j].instNm){
                    if(value2[j].lastRes == '200'){ //정상
                        value.evtLevel = 1;
                    }else{//장애
                        value.evtLevel = 2;
                    }
                    break;
                }
            }
        }
    };
    return Mois2_centerModel;
});
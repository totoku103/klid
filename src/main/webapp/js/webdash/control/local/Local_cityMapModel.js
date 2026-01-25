define(function (require) {
    var hmDashConf = require('hmDashConf');
    var evt1 = 0;
    var evt2 = 0;
    var name = "";
    function Local_cityMapModel() {
        this.data = [];
    }

    Local_cityMapModel.prototype = {
        getData: function(){
            return this.data;
        },
        setData: function(localCd,regionData){
            for (var i = 0; i < this.data.length; i++) {
                if(regionData.length >0) {
                    this.setDataById1(this.data[i], regionData);
                }
                this.data[i].evt1 = evt1;
                evt1 = 0;
            }
        },
        setData2: function(regionData){
            for (var i = 0; i < this.data.length; i++) {
                if(regionData.length >0) {
                    this.setDataById2(this.data[i], regionData);
                }
                this.data[i].evt2 = evt2;
                evt2 = 0;
            }
        },
        setData3: function(localCd,sidoData){
            var loc = hmDashConf.dashLoc["Local_" + localCd];
            this.data = loc;
            for (var i = 0; i < this.data.length; i++) {
                if(sidoData.length >0) {
                    this.setDataById3(this.data[i], sidoData);
                }
                this.data[i].name = name;
                name = "";
            }
        },
        setDataById1: function(value,value2) {
            for (var j = 0; j < value2.length; j++){
                if(value.instCd == value2[j].instCd){
                    evt1 = value2[j].cnt;
                    break;
                }
            }
        },
        setDataById2: function(value,value2) {
            for (var j = 0; j < value2.length; j++){
                if(value.instCd == value2[j].instCd){
                    evt2 = value2[j].cnt;
                    break;
                }
            }
        },
        setDataById3: function(value,value2) {
            for (var j = 0; j < value2.length; j++){
                if(value.instCd == value2[j].instCd){
                    name = value2[j].instNm;
                    break;
                }
            }
        }
    };

    return Local_cityMapModel;
});
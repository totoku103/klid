define(function (require) {
    var hmDashConf = require('hmDashConf');
    function Mois3_regionModel() {
        this.reset(); // 초기화
    }

    Mois3_regionModel.prototype = {
        reset: function () {
            this.data = hmDashConf.dashLoc.mois3RegionData;
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
        setDataById: function(value,value2) {
            for (var j = 0; j < value2.length; j++){
                if(value.loCd == value2[j].localCd){
                    value.cnt1 = value2[j].receiptCnt;
                    value.cnt2 = value2[j].processCnt;
                    value.cnt3 = value2[j].completeCnt;
                    break;
                }
            }
        }
    };

    return Mois3_regionModel;
});
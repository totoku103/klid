define(function (require) {
    var hmDashConf = require('hmDashConf');

    function Admctrl_mapModel() {
        this.reset(); // 초기화
    }

    Admctrl_mapModel.prototype = {
        reset: function () {
            this.data = hmDashConf.dashLoc.Admctrl_Map;
        },

        getData: function(){
            return this.data;
        },

        setData: function(dbData) {
            this.reset();
            if(dbData.length) {
                for (var i = 0; i < dbData.length; i++) {
                    this.setDataById(dbData[i]);
                }
            }
        },

        setDataById: function(value) {
            for(var i = 0; i < this.data.length; i++) {
                var item = this.data[i];
                if(item.localCd == value.localCd) {
                    $.extend(item, {
                        name: value.localNm,
                        forgeryEvt: value.forgeryEvt,
                        hcEvt: value.hcEvt
                    });
                    break;
                }
            }
        }
    };

    return Admctrl_mapModel;
});
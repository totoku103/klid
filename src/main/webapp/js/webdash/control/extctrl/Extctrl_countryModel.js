define(function (require) {
    var hmDashConf = require('hmDashConf');

    function Extctrl_countryModel() {
        this.reset(); // 초기화
    }

    Extctrl_countryModel.prototype = {
        reset: function () {
            this.data = hmDashConf.dashLoc.ExtControl_Map;
        },

        getData: function(){
            return this.data;
        },

        setData: function(dbData) {
            this.data = dbData;
        }
    };

    return Extctrl_countryModel;
});
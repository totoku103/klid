define(function (require) {
    var hmDashConf = require('hmDashConf');

    function Extbrf_countryModel() {
        this.reset(); // 초기화
    }

    Extbrf_countryModel.prototype = {
        reset: function () {
            this.data = hmDashConf.dashLoc.ExtBrefing_Map;
        },

        getData: function(){
            return this.data;
        },

        setData: function(dbData) {
            this.data = dbData;
        }
    };

    return Extbrf_countryModel;
});
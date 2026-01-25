define(function (require) {
    var hmDashConf = require('hmDashConf');

    function Extbrf_attackTop5Model() {
        this.reset(); // 초기화
    }

    Extbrf_attackTop5Model.prototype = {
        reset: function () {
            this.data = [];
        },
        getData: function(){
            return this.data;
        },

        setData: function(dbData) {
            this.data = dbData;
        }
    };

    return Extbrf_attackTop5Model;
});
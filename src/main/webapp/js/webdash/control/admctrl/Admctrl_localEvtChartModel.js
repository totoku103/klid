define(function (require) {

    function Admctrl_localEvtChartModel() {
        this.reset(); // 초기화
    }

    Admctrl_localEvtChartModel.prototype = {
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

    return Admctrl_localEvtChartModel;
});
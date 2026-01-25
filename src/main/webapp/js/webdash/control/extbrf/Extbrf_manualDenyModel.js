define(function (require) {
    function Extbrf_manualDenyModel() {
        this.reset(); // 초기화
    }

    Extbrf_manualDenyModel.prototype = {
        reset: function () {
            this.data = {
                cnt1: 0,
                cnt2: 0,
                cnt3: 0
            };
        },

        getData: function(){
            return this.data;
        },

        setData: function(dbData) {
            this.data = dbData;
        }
    };

    return Extbrf_manualDenyModel;
});
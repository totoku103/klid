define(function (require) {
    function Admctrl_manualDenyModel() {
        this.reset(); // 초기화
    }

    Admctrl_manualDenyModel.prototype = {
        reset: function () {
            this.data = {
                receiptCnt: 0,
                processCnt: 0,
                completeCnt: 0
            };
        },

        getData: function(){
            return this.data;
        },

        setData: function(dbData) {
            this.data = dbData;
        }
    };

    return Admctrl_manualDenyModel;
});
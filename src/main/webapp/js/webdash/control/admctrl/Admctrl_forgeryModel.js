define(function (require) {
    function Admctrl_forgeryModel() {
        this.reset(); // 초기화
    }

    Admctrl_forgeryModel.prototype = {
        reset: function () {
            this.data = [
                {id: 'depth', cnt: 0},
                {id: 'normal', cnt: 0},
                {id: 'forgery', cnt: 0},
                {id: 'error', cnt: 0}
            ]
        },

        getData: function(){
            return this.data;
        },

        setData: function(dbData) {
            this.data[0].cnt = dbData.depthCnt;
            this.data[1].cnt = dbData.normalCnt;
            this.data[2].cnt = dbData.forgeryCnt;
            this.data[3].cnt = dbData.errorCnt;
        }
    };

    return Admctrl_forgeryModel;
});
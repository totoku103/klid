define(function (require) {
    function Brfext_manualDenyModel() {
        this.reset(); // 초기화
    }

    Brfext_manualDenyModel.prototype = {
        reset: function () {
            this.data = {
                cnt1: 0,
                cnt2: 0,
                cnt3: 0
            };
        },

        getData: function(){
            var data = {
                cnt1: Math.floor(Math.random() * 99),
                cnt2: Math.floor(Math.random() * 99),
                cnt3: Math.floor(Math.random() * 99)
            };
            this.data = data;
            return this.data;
        }
    };

    return Brfext_manualDenyModel;
});
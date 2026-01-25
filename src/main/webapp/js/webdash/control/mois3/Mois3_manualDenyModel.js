define(function (require) {
    function Mois3_manualDenyModel() {
        this.data = new Object();
    }

    Mois3_manualDenyModel.prototype = {
        getData: function(){
            return this.data;
        },
        setData: function (cnt1,cnt2,cnt3) {
            this.data.cnt1  = cnt1;
            this.data.cnt2  = cnt2;
            this.data.cnt3  = cnt3;
        }
    };

    return Mois3_manualDenyModel;
});
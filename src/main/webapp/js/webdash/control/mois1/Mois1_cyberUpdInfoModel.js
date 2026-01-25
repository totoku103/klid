define(function (require) {

    function Mois1_cyberUpdInfoModel() {
        this.data = new Object();
    }

    Mois1_cyberUpdInfoModel.prototype = {
        getData: function(){
            return this.data;
        },
        setData: function (beforeLvl,afterLvl,date) {
            this.data.beforeLvl = beforeLvl;
            this.data.afterLvl  = afterLvl;
            this.data.date       = date;
        }
    };

    return Mois1_cyberUpdInfoModel;
});
define(function (require) {
    function Mois1_cyberAlertModel() {
        this.data="";
    }

    Mois1_cyberAlertModel.prototype = {
        getData: function(){
            return this.data;
        },
        setData: function (cyberLvl) {
            this.data = cyberLvl;
        }
    };

    return Mois1_cyberAlertModel;
});
define(function (require) {
    function Mois4_statusModel() {
        this.data="";
    }
    Mois4_statusModel.prototype = {
        getData: function(){
          return this.data;
        },

        setData: function(statusData){
            this.data = statusData;
        }
    };
    return Mois4_statusModel;
});
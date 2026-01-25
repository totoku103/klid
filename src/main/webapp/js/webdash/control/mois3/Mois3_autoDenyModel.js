define(function (require) {
    function Mois3_autoDenyModel() {
        this.data = "";
    }

    Mois3_autoDenyModel.prototype = {
        getData: function(){
            return this.data;
        },
        setData: function (data) {
            this.data = data;
        }
    };

    return Mois3_autoDenyModel;
});
define(function (require) {

    function Local_securityBoardModel() {
        this.data = [];
    }

    Local_securityBoardModel.prototype = {
        getData: function(){
            return this.data;
        },
        setData: function (resultData) {
            var secuList = new Array() ;
            this.data = secuList;
            if(resultData.length > 0){
                for (var i = 0; i < resultData.length; i++) {
                    var data = new Object() ;
                    data.title   = resultData[i].title;
                    data.ymd   = resultData[i].ymd;
                    secuList.push(data);
                }
                this.data = secuList;
            }

        }
    };

    return Local_securityBoardModel;
});
define(function (require) {
    function Admctrl_sysErrorModel() {
        this.reset(); // 초기화
    }

    Admctrl_sysErrorModel.prototype = {
        reset: function () {
            this.data =  [];
        },

        getData: function(){
            return this.data;
        },

        setData: function(dbData) {
            var sysErrorList = new Array() ;
            this.data = sysErrorList;
            if(dbData.length > 0){
                for (var i = 0; i < dbData.length; i++) {
                    var data = new Object() ;
                    data.id   = Number(i)+1;
                    data.name = dbData[i].name;
                    // 장애표시.
                    if(dbData[i].originNameCnt > 0){
                        data.evt   = 1; //장애있음.
                    }else{
                        data.evt   = 0; //장애없음.
                    }
                    sysErrorList.push(data);
                }
                this.data = sysErrorList;
            }
        }
    };

    return Admctrl_sysErrorModel;
});
define(function (require) {

    function Local_noticeBoardModel() {
        this.data = [];
    }

    Local_noticeBoardModel.prototype = {
        getData: function(){
            return this.data;
        },
        setData: function (resultData) {
            var noticeList = new Array() ;
            this.data = noticeList;
            if(resultData.length > 0){
                for (var i = 0; i < resultData.length; i++) {
                    var data = new Object() ;
                    data.title   = resultData[i].title;
                    data.ymd   = resultData[i].ymd;
                    noticeList.push(data);
                }
                this.data = noticeList;
            }
        }
    };

    return Local_noticeBoardModel;
});
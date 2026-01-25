define(function (require) {
    var proccnt = 0;
    var compcnt = 0;

    function Local_instStateModel() {
        this.data =[];
    }

    Local_instStateModel.prototype = {
        getData: function(){
            return this.data;
        },
        setData: function (resultData) {
            var stateList = new Array() ;
            this.data = stateList;

            if(resultData.length > 0){
                //총계표시
                // var data = new Object() ;
                // data.name         ="계";
                // data.totalCnt	  = Number(proccnt)+Number(compcnt);
                // data.procCnt	  = proccnt;
                // data.compCnt	  = compcnt;
                // if(Number(compcnt)+Number(compcnt) == 0){
                //     data.procRate	  =0;
                // }else{
                //     var percrate = (Number(compcnt)/(Number(proccnt)+Number(compcnt)))*100;
                //     data.procRate = Math.floor(percrate);
                // }
                // stateList.unshift(data);

                //데이터표시.
                for (var i = 0; i < resultData.length; i++) {
                    var data = new Object() ;
                    data.name         = resultData[i].instNm;
                    data.totalCnt	  = Number(resultData[i].processCnt)+Number(resultData[i].completeCnt);
                    data.procCnt	  =resultData[i].processCnt;
                    data.compCnt	  =resultData[i].completeCnt;
                    if(Number(resultData[i].processCnt)+Number(resultData[i].completeCnt) == 0){
                        data.procRate	  =0;
                    }else{
                        var percrate = (Number(resultData[i].completeCnt)/ (Number(resultData[i].processCnt)+Number(resultData[i].completeCnt)) )*100;
                        data.procRate = Math.floor(percrate);
                    }
                    stateList.push(data);
                }

            }
            this.data = stateList;

        },
        //총 처리중 처리완료 표시.
        setCount: function (procCntData,compCntData) {
            proccnt = procCntData;
            compcnt = compCntData;
        }
    };

    return Local_instStateModel;
});
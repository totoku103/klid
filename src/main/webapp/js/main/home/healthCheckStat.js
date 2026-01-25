/**
 * Created by hamon on 2018-12-31.
 */
var $grid
var userId;

var curTime;

var Main = {
    /** variable */
    initVariable: function() {
        $grid = $('#grid');

        Main.setCurTime();

    },

    /** add event */
    observe: function() {
        $('button').bind('click', function(event) { Main.eventControl(event); });
    },

    /** event handler */
    eventControl: function(event) {
        var curTarget = event.currentTarget;
        switch(curTarget.id) {
            case 'btnSearch':
                this.search();
                break;
        }

    },
    /** init design */
    initDesign: function() {

        HmWindow.create($('#pwindow'), 100, 100);
        HmGrid.create($grid, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    url: ctxPath + '/api/main/home/healthCheckUrl/getHealthCheckStat',
                    datafields: [
                        { name: 'SEQ_NO',type: 'int' },
                        { name: 'INST_NM',type: 'string' },
                        { name: 'URL',    type: 'string' },
                        { name: 'INST_CD',    type: 'string' },
                        { name: 'DT0000',    type: 'string' },


                        { name: 'DT0100',    type: 'string' },


                        { name: 'DT0200',    type: 'string' },


                        { name: 'DT0300',    type: 'string' },


                        { name: 'DT0400',    type: 'string' },


                        { name: 'DT0500',    type: 'string' },


                        { name: 'DT0600',    type: 'string' },


                        { name: 'DT0700',    type: 'string' },


                        { name: 'DT0800',    type: 'string' },


                        { name: 'DT0900',    type: 'string' },


                        { name: 'DT1000',    type: 'string' },


                        { name: 'DT1100',    type: 'string' },


                        { name: 'DT1200',    type: 'string' },


                        { name: 'DT1300',    type: 'string' },


                        { name: 'DT1400',    type: 'string' },


                        { name: 'DT1500',    type: 'string' },


                        { name: 'DT1600',    type: 'string' },


                        { name: 'DT1700',    type: 'string' },


                        { name: 'DT1800',    type: 'string' },


                        { name: 'DT1900',    type: 'string' },


                        { name: 'DT2000',    type: 'string' },


                        { name: 'DT2100',    type: 'string' },


                        { name: 'DT2200',    type: 'string' },


                        { name: 'DT2300',    type: 'string' },

                        { name: 'DTNOW',    type: 'string' }


                    ]
                },
                {
                    formatData : function(data) {
                        data.instCd = $('#sInstCd').val();
                        data.sAuthMain = $("#sAuthMain").val();
                        //data.sAuthMain = "TEST"; //일일 헬스체크 전체 나오기 위해 임시적으로 코딩
                        return data;
                    }
                }
            ),
            pageable : false,
            columns:
                [
                    { datafield: 'SEQ_NO',  width:60, text: "순번", cellsalign:'center',
                        cellsrenderer: function(row, column, value, rowData) {
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (row + 1) +"</div>";
                        }
                    },
                    { datafield: 'INST_NM',  width:150, text: "홈페이지명", cellsalign:'center'},
                    { datafield: 'URL',     minwidth:120, text: "URL", cellsalign:'center' },
                    { datafield: 'INST_CD',  text: "INST_CD", hidden: true},
                    { datafield: 'DTNOW', text:'현재', width:50, cellsalign:'center', cellsrenderer: Main.imagerenderer2 },
                    { datafield: 'DT0000', text:'00:00', width:50, cellsalign:'center', cellsrenderer: Main.imagerenderer },
                    { datafield: 'DT0100', text:'01:00', width:50, cellsalign:'center', cellsrenderer: Main.imagerenderer },
                    { datafield: 'DT0200', text:'02:00', width:50, cellsalign:'center', cellsrenderer: Main.imagerenderer },
                    { datafield: 'DT0300', text:'03:00', width:50, cellsalign:'center', cellsrenderer: Main.imagerenderer },
                    { datafield: 'DT0400', text:'04:00', width:50, cellsalign:'center', cellsrenderer: Main.imagerenderer },
                    { datafield: 'DT0500', text:'05:00', width:50, cellsalign:'center', cellsrenderer: Main.imagerenderer },
                    { datafield: 'DT0600', text:'06:00', width:50, cellsalign:'center', cellsrenderer: Main.imagerenderer },
                    { datafield: 'DT0700', text:'07:00', width:50, cellsalign:'center', cellsrenderer: Main.imagerenderer },
                    { datafield: 'DT0800', text:'08:00', width:50, cellsalign:'center', cellsrenderer: Main.imagerenderer },
                    { datafield: 'DT0900', text:'09:00', width:50, cellsalign:'center', cellsrenderer: Main.imagerenderer },
                    { datafield: 'DT1000', text:'10:00', width:50, cellsalign:'center', cellsrenderer: Main.imagerenderer },
                    { datafield: 'DT1100', text:'11:00', width:50, cellsalign:'center', cellsrenderer: Main.imagerenderer },
                    { datafield: 'DT1200', text:'12:00', width:50, cellsalign:'center', cellsrenderer: Main.imagerenderer },
                    { datafield: 'DT1300', text:'13:00', width:50, cellsalign:'center', cellsrenderer: Main.imagerenderer },
                    { datafield: 'DT1400', text:'14:00', width:50, cellsalign:'center', cellsrenderer: Main.imagerenderer },
                    { datafield: 'DT1500', text:'15:00', width:50, cellsalign:'center', cellsrenderer: Main.imagerenderer },
                    { datafield: 'DT1600', text:'16:00', width:50, cellsalign:'center', cellsrenderer: Main.imagerenderer },
                    { datafield: 'DT1700', text:'17:00', width:50, cellsalign:'center', cellsrenderer: Main.imagerenderer },
                    { datafield: 'DT1800', text:'18:00', width:50, cellsalign:'center', cellsrenderer: Main.imagerenderer },
                    { datafield: 'DT1900', text:'19:00', width:50, cellsalign:'center', cellsrenderer: Main.imagerenderer },
                    { datafield: 'DT2000', text:'20:00', width:50, cellsalign:'center', cellsrenderer: Main.imagerenderer },
                    { datafield: 'DT2100', text:'21:00', width:50, cellsalign:'center', cellsrenderer: Main.imagerenderer },
                    { datafield: 'DT2200', text:'22:00', width:50, cellsalign:'center', cellsrenderer: Main.imagerenderer },
                    { datafield: 'DT2300', text:'23:00', width:50, cellsalign:'center', cellsrenderer: Main.imagerenderer },
                ],
            editable: false,
            editmode : 'selectedcell'
        });
    },
    imagerenderer: function (row, datafield, value) {
        var cell = "<div style='margin-top: 2px' class='jqx-center-align'>";
        var _INST_CD = $grid.jqxGrid('getrowdata', row).INST_CD;
        var URL = $grid.jqxGrid('getrowdata', row).URL;
        if(datafield.substring(2,6) > curTime){
            cell += '   <img height="9" width="9" src="../../../img/MainImg/gray.png"/>';
        } else {
            //console.log(curTime);
            //console.log(datafield.substring(2,6));
            //console.log((datafield.substring(2,6) > curTime));
            if( URL.indexOf('tongyeong.go.kr') > -1 || URL.indexOf('uiwang.go.kr') > -1 || URL.indexOf('gangbuk.go.kr') > -1 || URL.indexOf('ddm.go.kr') > -1 || URL.indexOf('sd.go.kr') > -1  || URL.indexOf('ep.go.kr') > -1  || URL.indexOf('anseong.go.kr') > -1){
                cell += '   <img height="9" width="9" src="../../../img/MainImg/blue.png"/>'
            }else{
                if (value == 0) {
                    cell += '   <img height="9" width="9" src="../../../img/MainImg/blue.png"/>'
                } else {
                    cell += '   <img height="9" width="9" src="../../../img/MainImg/red.png" onclick="Main.doCheck(' + _INST_CD + ');"/>';
                }
            }

        }

        cell += "</div>";
        return cell;
    },
    //실시간 이미지 표현
    imagerenderer2: function (row, datafield, value) {
        var cell = "<div style='margin-top: 2px' class='jqx-center-align'>";
        var _INST_CD = $grid.jqxGrid('getrowdata', row).INST_CD;
        var URL = $grid.jqxGrid('getrowdata', row).URL;
        if( URL.indexOf('tongyeong.go.kr') > -1 || URL.indexOf('uiwang.go.kr') > -1 || URL.indexOf('gangbuk.go.kr') > -1 || URL.indexOf('ddm.go.kr') > -1 || URL.indexOf('sd.go.kr') > -1  || URL.indexOf('ep.go.kr') > -1  || URL.indexOf('anseong.go.kr') > -1){
            cell += '   <img height="9" width="9" src="../../../img/MainImg/blue.png"/>'
        }else{
            if (value == 0) {
                cell += '   <img height="9" width="9" src="../../../img/MainImg/blue.png"/>'
            } else {
                cell += '   <img height="9" width="9" src="../../../img/MainImg/red.png" onclick="Main.doCheck(' + _INST_CD + ');"/>';
            }
        }
        cell += "</div>";
        return cell;
    },
    /** init data */
    initData: function() {
        setInterval(function(){

            Main.search();

        }, 1000 * 60 * 15);
        //1000(1초) * 60(1분) * 15(15분)
    },
    setCurTime: function(){
        var curDate = new Date();
        var _HOUR = curDate.getHours();
        var _MIN = curDate.getMinutes();

        if(_HOUR < 10) _HOUR = "0" + _HOUR;
        if(_MIN < 10) _MIN = "0" + _MIN;

        curTime = _HOUR + '' + _MIN;
    },

    search : function() {
        Main.setCurTime();
        HmGrid.updateBoundData($grid, ctxPath + '/api/main/home/healthCheckUrl/getHealthCheckStat');
    },
    doCheck: function(_INST_CD){
        location.href = ctxPath + '/main/home/healthCheckUrl.do?instCd='+ _INST_CD;
    },
};


$(function() {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
});
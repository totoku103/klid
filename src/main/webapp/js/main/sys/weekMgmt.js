var $weekCalendar;
var weekList = [];
var pickDate;
var Main = {
    /** variable */
    initVariable: function () {
        $weekCalendar = $("#weekCalendar");
    },

    /** add event */
    observe: function () {
        $('button').bind('click', function (event) {
            Main.eventControl(event);
        });
    },

    /** event handler */
    eventControl: function (event) {
        var params={
            comCode1:4005,
            comCode2:pickDate,
            codeName:'공휴일'+pickDate,
            codeLvl:2,
            useYn:'Y'
        };

        var curTarget = event.currentTarget;
        switch (curTarget.id) {
            case 'btnAdd'://추가 - 추가 후 추가된 날짜 week_yn 0 -> 1
                if(!confirm("공휴일로 추가하시겠습니까?\n\n※추가하시면 해당 일에 해당하는 사고가 주중에서 공휴일로 모두 변경됩니다.")) return;
                params.weekYn=1;
                Server.post('/api/main/sys/addWeekDay', {
                    data: params,
                    success: function (data) {
                        alert("추가되었습니다.");
                        Main.getWeekList();
                        Main.setBtnViewControll(2);
                    }
                });
                break;
            case 'btnDel'://삭제  - 삭제 후 지워진 날짜 week_yn 1 -> 0
                if(!confirm("설정된 공휴일을 삭제하시겠습니까?\n\n※삭제하시면 해당 일에 해당하는 사고가 공휴일에서 주중으로 모두 변경됩니다.")) return;
                params.weekYn=0;
                Server.post('/api/main/sys/delWeekDay', {
                    data: params,
                    success: function (data) {
                        alert("삭제되었습니다.");
                        Main.getWeekList();
                        Main.setBtnViewControll(3);
                    }
                });
                break;
        }
    },

    /** init design */
    initDesign: function () {
        $weekCalendar.jqxCalendar({enableTooltips:true, width:"100%", height:"100%", enableWeekend:true})
            .on('change', function (event) {
                var date = event.args.date;
                pickDate = Main.makeDateToStr(date.getFullYear(),date.getMonth(), date.getDate());
                if(weekList.indexOf(pickDate)!==-1){
                    Main.setBtnViewControll(2);
                }else{
                    if(date.getDay()==6||date.getDay()==0){
                        Main.setBtnViewControll(1);
                    }else{
                        Main.setBtnViewControll(3);
                    }
                }
            });
        $weekCalendar.jqxCalendar('setDate', new Date());
    },

    /** init data */
    initData: function () {
        this.getWeekList();
    },

    makeDateToStr: function (yyyy,mm,dd) {
        var Year = yyyy.toString();
        var Month = this.makePad(mm + 1,2);
        var Day = this.makePad(dd, 2);
        return Year+Month+Day;
    },
    
    makePad:function (number, length) {
        var str = '' + number;
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    },

    makeStrToDate: function (dateStr) {
        var year        = dateStr.substring(0,4);
        var month       = dateStr.substring(4,6);
        var day         = dateStr.substring(6,8);
        var date        = new Date(year, month-1, day);
        return date;
    },

    getWeekList:function () {
        $.ajax({
            type: 'GET',
            url: ctxPath + '/api/main/sys/getCodeList',
            data: {comCode1 : 4005, codeLvl: 2},
            async: false,
            success: function (data) {
                weekList = [];
                $weekCalendar.jqxCalendar("specialDates", []);
                data.resultData.forEach(function (p1, p2) {
                    weekList.push(p1.comCode2);
                    $weekCalendar.jqxCalendar('addSpecialDate',Main.makeStrToDate(p1.comCode2),'', '공휴일');
                });
            }
        });
    },
    
    setBtnViewControll: function (number) {
        switch (number) {
            case 1:// 주말인 경우
                $("#btnAdd").css('display','none');
                $("#btnDel").css('display','none');
                break;
            case 2:// 평일인데 주말인 경우
                $("#btnAdd").css('display','none');
                $("#btnDel").css('display','');
                break;
            case 3:// 평일인데 주중인 경우
                $("#btnAdd").css('display','');
                $("#btnDel").css('display','none');
                break;
        }
    }
};

$(function () {
    Main.initVariable();
    Main.initDesign();
    Main.initData();
    Main.observe();
});
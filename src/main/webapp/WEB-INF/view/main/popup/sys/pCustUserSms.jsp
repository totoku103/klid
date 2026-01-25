<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="tableBorder" id="smsTableCon" style="height: 500px;">
	<div class="conLine" style="width:26%; height: 90%;">
		<table>
			<thead>
				<tr>
					<td class="pop_gridSub">내용</td>
				</tr>
			</thead>
			<tbody>
				<tr class="pop_grid">
					<td >
						<textarea id="smsContent"placeholder="내용을 입력하세요."></textarea>
						<span id="byteSpan">0</span> / 80bytes
					</td>
				</tr>
			</tbody>
		</table>
		<div class="smsInput" >
			<div class="smsInputTitle">보내는번호</div>
			<input type="text" id="sendNum1" placeholder="번호"  maxlength="3" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
			-
			<input type="text" id="sendNum2" placeholder="번호"  maxlength="4" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
			-
			<input type="text" id="sendNum3" placeholder="번호"  maxlength="4" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
		</div>
	</div>
	<div class="conLine" style="width:30%; height: 90%; border:1px solid #989898;" >
		<div class="smsInputTitle2" style="">수신자</div>
		<dl class="sendUser">
			<dt><input type="text" id="nameText" placeholder="이름"  ></dt>
			<dd>
				<input type="text" id="mobleText1" placeholder="번호"  maxlength="3" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
				-
				<input type="text" id="mobleText2"  placeholder="번호"  maxlength="4" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
				-
				<input type="text" id="mobleText3"  placeholder="번호"  maxlength="4" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
				<button id="btnPlus" type="button" class="p_btnPlus3"  style="position:relative;top:5px; "></button>
			</dd>
		</dl>

		<div id="smsUserGrid1" style="margin-top:5px;border-left:none;border-right:none;border-bottom:none;" ></div>
	</div>
	<div id="conArrow" class="conLine">
		<div class="arrBtn">
			<div class="Out" id="outBtn" ></div>
			<div class="In" id="inBtn" ></div>
		</div>
	</div>
	<div id="conMgnNull" class="conLine" style="width:36%; height: 90%;" >
		<div id="splitterSub">
			<div>
				<div id="smsUserGrid2"   style="border:0;border-bottom:1px solid #989898"></div>
			</div>
			<div>
				<div id="ddbPntSInstCd_smsSend" style="margin-left: 3px;  float: left;margin-bottom:7px ">
					<div id="pntSInstGrid_smsSend" style="border: none; display: none"></div>
				</div>
				<%--<button id="btnSearch_smsSend" type="button" class="p_btn" style="border:none; float: left"></button>--%>
				<div id="smsUserGrid3"  style="border:0;border-top:1px solid #989898"></div>
			</div>
		</div>
	</div>
</div>
<div style="margin-top: -50px; margin-left:120px;">
	<button id="pbtnSms" type="button" class="p_btnSms"></button>
	<button id="pbtnSmsClose" type="button" class="p_btnClose"></button>
</div>

<script>
    var $smsUserGrid1= $('#smsUserGrid1');
    var $smsUserGrid2 = $('#smsUserGrid2');
    var $smsUserGrid3 =$('#smsUserGrid3');
    var userPhone = "";
    var sendNum = "";
    var acType = "";
    var flag = 'N';
    var smsGrpNo = 1;

    function smsPop_init(params) {
        //사고에서 호출.
        if(params.inciNo != null && params.inciNo != "" && typeof params.inciNo !== "undefined"){
            var smsContent = params.dmgInstNm +" "+params.accdTypNm+"\n관련";
            smsContent +="긴급 사고 ("+params.inciNo+")확인부탁드립니다.";
            $("#smsContent").val(smsContent);
            $("#smsContent").removeClass();
            bytesHandler('#smsContent');
            acType = params.type;
        }

        //위변조에서 호출
        if(params.smsType == 'forgery'){
            $("#smsContent").val(params.smsForgeryCont);
            $("#smsContent").removeClass();
            acType = 3;
        }

        //사용자 폰번호 가져오기.
        $.ajax({
            type: 'POST',
            url: ctxPath + '/main/sys/custUserMgmt/getUserPhone.do',
            data: {userId : $('#sUserId').val()},
            success: function (data) {
                userPhone = data.resultData.offcTelno;
                if(userPhone != ""){
                    sendNum = userPhone.split("-");
                    $("#sendNum1").val(sendNum[0]);
                    $("#sendNum2").val(sendNum[1]);
                    $("#sendNum3").val(sendNum[2]);
                    $("#sendNum1").removeClass();
                    $("#sendNum2").removeClass();
                    $("#sendNum3").removeClass();
                }
            }
        });

        $('#splitterSub').jqxSplitter({ width: '100%', height: '100%', orientation: 'horizontal', theme: jqxTheme, showSplitBar: false, splitBarSize: 40, resizable: false, panels: [{ size: '60%' }, { size: '40%' }] });

        HmGrid.create($smsUserGrid1, {
            height: '70%',
            pageable: false,
            selectionmode: 'multiplerowsextended',
            showtoolbar: false,
            columns: [
                { text: '이름',		datafield: 'userName',  cellsalign : 'center', width: '50%'  },
                { text: '전화번호',	datafield: 'moblPhnNo',	 cellsalign : 'center', width: '50%'  },
            ]
        });

        //수신자 더블클릭
        $smsUserGrid1.on('celldoubleclick', function(event) {
            var selectedrowindex = $("#smsUserGrid1").jqxGrid('getselectedrowindex');
            var rowscount = $("#smsUserGrid1").jqxGrid('getdatainformation').rowscount;
            if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                var id = $("#smsUserGrid1").jqxGrid('getrowid', selectedrowindex);
                $("#smsUserGrid1").jqxGrid('deleterow', id);
            }
        });

        var smsInstCd = "";
        if(params.instCd != null && params.instCd != "" && typeof params.instCd !== "undefined"){
            smsInstCd = params.instCd;
        }else{
            smsInstCd = $('#sInstCd').val();
        }

        var columns;

        if($('#sAuthMain').val()=='AUTH_MAIN_2'){
            columns = [
                { text: '지역명',	datafield: 'localNm',	 cellsalign : 'center', width: '10%'  },
                { text: '기관명',	datafield: 'instNm',	 cellsalign : 'center', width: '20%' ,
                    cellsrenderer: function(row, column, value, rowData){
                        var data = $smsUserGrid2.jqxGrid('getrowdata', row);

                        if(value==data.localNm){
                            value='본청';
                        }

                        return '<div style="margin-top: 2.5px; text-align:center;">'+value+'</div>';
                    }
                },
                { text: '이름',		datafield: 'userName',  cellsalign : 'center', width: '20%'  },
                { text: '전화번호',	datafield: 'moblPhnNo',	 cellsalign : 'center', width: '35%' },
                { text: '권한',		datafield: 'authSub',  cellsalign : 'center', width: '15%', filterable: false,
                    cellsrenderer: function(row, column, value, rowData){
                        if(value=='AUTH_SUB_1')
                            value='관리자'
                        else if(value=='AUTH_SUB_2')
                            value='담당자'
                        else if(value=='AUTH_SUB_3')
                            value='운영자'

                        return '<div style="margin-top: 2.5px; text-align:center;">'+value+'</div>';
                    }
                },
            ]
        }else{
            columns = [
                { text: '지역명',	datafield: 'localNm',	 cellsalign : 'center', hidden:true  },
                { text: '기관명',	datafield: 'instNm',	 cellsalign : 'center', width: '15%' ,
                    cellsrenderer: function(row, column, value, rowData){
                        var data = $smsUserGrid2.jqxGrid('getrowdata', row);

                        if(value==data.localNm){
                            value='본청';
                        }

                        return '<div style="margin-top: 2.5px; text-align:center;">'+value+'</div>';
                    }
                },
                { text: '이름',		datafield: 'userName',  cellsalign : 'center', width: '30%'  },
                { text: '전화번호',	datafield: 'moblPhnNo',	 cellsalign : 'center', width: '40%'  },
                { text: '권한',		datafield: 'authSub',  cellsalign : 'center', width: '15%', filterable: false,
                    cellsrenderer: function(row, column, value, rowData){
                        if(value=='AUTH_SUB_1')
                            value='관리자'
                        else if(value=='AUTH_SUB_2')
                            value='담당자'
                        else if(value=='AUTH_SUB_3')
                            value='운영자'

                        return '<div style="margin-top: 2.5px; text-align:center;">'+value+'</div>';
                    }
                }
            ]
        }

        HmGrid.create($smsUserGrid2, {
            source: new $.jqx.dataAdapter(
                {
                    type: 'POST',
                    datatype: "json",
                    url: ctxPath + '/main/sys/custUserMgmt/getSmsUserList.do',
                    data: {userId : $('#sUserId').val(),instCd:smsInstCd}

                }
            ),
            height: '97%',
            pageable: false,
            selectionmode: 'multiplerowsextended',
            showtoolbar: true,
            rendertoolbar: function(toolbar) {
                var container = $('<div style="margin: 5px;text-align:center;"></div>');
                var span = $('<span style="font-weight: bold; margin-top: 5px; margin-right: 4px;">연락처</span>');
                toolbar.empty();
                toolbar.append(container);
                container.append(span);
            },
            columns:columns
        }, CtxMenu.Filter);
		
        
        //그룹콤보
        $('#ddbPntSInstCd_smsSend').jqxDropDownButton({ width: 120, height: 22 });
        var initContent = '<div style="position: relative; margin-left: 3px; margin-top: 2px;">SMS그룹</div>';
        $('#ddbPntSInstCd_smsSend').jqxDropDownButton('setContent', initContent);

        HmGrid.create($('#pntSInstGrid_smsSend'), {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    url: ctxPath + '/main/sys/custUserMgmt/getSmsGroup.do'
                },
                {
                    formatData: function(data) {
                        $.extend(data, {
                            useYn: 'Y'
                        });
                        return data;
                    }
                }
            ),
            pageable : false,
            sortable :false,
            autoheight: false,
            columns:
                [
                    { text : '기관코드', datafield : 'grpNo', width : 150, hidden: true },
                    { text: '그룹명', datafield: 'grpName', minwidth: 150 , sortable: false,
                        cellsrenderer: function(row, column, value, rowData) {
                            var dept = $('#pntSInstGrid_smsSend').jqxGrid('getcellvalue', row, "groupDepth");
                            var dpthBlank = '';
                            if(dept != 1){
                                for(var i=0; i < dept; i++){
                                    dpthBlank = '&nbsp;' + dpthBlank;
                                }
                            }
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-left-align'>" + dpthBlank+value +"</div>";
                        }
                    },
                    { text: 'LEVEL', datafield: 'groupDepth', width: 80 , sortable: false},
                ],
            width: 280, height: 200
        });
        $('#pntSInstGrid_smsSend').on('rowselect', function(event) {
            var rowdata = $(this).jqxGrid('getrowdata', event.args.rowindex);
            if(rowdata!=null){
                var content = '<div style="position: relative; margin-left: 3px; margin-top: 2px">' + rowdata.grpName + '</div>';
                $('#ddbPntSInstCd_smsSend').jqxDropDownButton('setContent', content);
                $('#ddbPntSInstCd_smsSend').jqxDropDownButton('close');

                smsGrpNo = rowdata.grpNo;
                HmGrid.updateBoundData($smsUserGrid3, ctxPath + '/main/sys/custUserMgmt/getSmsOfUserList.do');
            }
        }).on('bindingcomplete', function(event) {
            $('#pntSInstGrid_smsSend').css('display', 'block');
        });

        HmGrid.create($smsUserGrid3, {
            source: new $.jqx.dataAdapter(
                {
                    type: 'POST',
                    datatype: "json",
                    url: ctxPath + '/main/sys/custUserMgmt/getSmsOfUserList.do',
                    data: {userId : $('#sUserId').val(),instCd:smsInstCd}
                },
                {
                    formatData: function(data) {
                        /*var selected_idx = $('#pntSInstGrid_smsSend').jqxGrid('getselectedrowindex');
                        var rowData = $('#pntSInstGrid_smsSend').jqxGrid('getrowdata', selected_idx);
                        var smsGroupSeq = 1;

                        if(selected_idx != -1){
                            smsGroupSeq = rowData.grpNo
                        }*/
                        $.extend(data, {
                            smsGroupSeq: smsGrpNo
                        });
                        console.log("zzzz=   "+  smsGrpNo)
                        return data;

                    }
                }
            ),
            height: '130px',
            pageable: false,
            selectionmode: 'multiplerowsextended',
            showtoolbar: true,
            rendertoolbar: function(toolbar) {
                var container = $('<div style="margin: 5px;text-align:center;"></div>');
                var span = $('<span style="font-weight: bold; margin-top: 5px; margin-right: 4px;">외부연락처</span>');
                toolbar.empty();
                toolbar.append(container);
                container.append(span);
            },
            columns: [
                { text: '이름',		datafield: 'userName',  cellsalign : 'center', width: '50%'  },
                { text: '전화번호',	datafield: 'moblPhnNo',	 cellsalign : 'center', width: '50%'  },
            ]
        });
        //연락처 더블클릭
        $smsUserGrid2.on('celldoubleclick', function(event) {
            var selectedRowIndex = event.args.rowindex;
            //중복체크.
            var rowscount = $("#smsUserGrid1").jqxGrid('getdatainformation').rowscount;
            if(rowscount >0){
                for(var i=0; i<rowscount; i++){
                    var data_row = $("#smsUserGrid1").jqxGrid('getcellvalue', i, 'moblPhnNo');
                    var data_row2= $("#smsUserGrid2").jqxGrid('getcellvalue', selectedRowIndex, 'moblPhnNo');
                    if(data_row == data_row2){
                        alert('수신자 목록에 이미 등록되어있습니다.');
                        return false;
                    }
                }
            }
            var itemget = $smsUserGrid2.jqxGrid('getrowdata', selectedRowIndex);
            $("#smsUserGrid1").jqxGrid('addrow', null, itemget);
        });
    }//smsPop_init

    //수신자 추가
    $('#outBtn').click(function() {

        duplCheck($smsUserGrid2);
        duplCheck($smsUserGrid3);

    });

    //수신자 삭제
    $('#inBtn').click(function() {

        var selectedRowIndexes = HmGrid.getRowIdxes($('#smsUserGrid1'));

        if(selectedRowIndexes.length==0){
            alert('수신자를 선택해주세요.');
            return false;
        }

        var _uids = [];
        $.each(selectedRowIndexes, function(idx, value) {
            var tmp = $('#smsUserGrid1').jqxGrid('getrowdata', value);
            _uids.push(tmp.uid);
        });

        $('#smsUserGrid1').jqxGrid('deleterow', _uids);

//		var rowscount = $('#smsUserGrid1').jqxGrid('getdatainformation').rowscount;
//
//		for(var i=0; i<selectedRowIndexes.length; i++){
//		    var selectedrowindex = selectedRowIndexes[selectedRowIndexes.length-i];
//			if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
//				var id = $("#smsUserGrid1").jqxGrid('getrowid', selectedrowindex);
//				$("#smsUserGrid1").jqxGrid('deleterow', id);
//			}
//		}


//		for(var i=0; i<selectedRowIndexes.length; i++){
//			var id = $("#smsUserGrid1").jqxGrid('getrowid', selectedRowIndexes[i]);
//			$("#smsUserGrid1").jqxGrid('deleterow', id);

//        var selectedrowindex = $("#smsUserGrid1").jqxGrid('getselectedrowindex');
//        if( selectedrowindex == -1){
//            alert('수신자를 선택해주세요.');
//            return false;
//        }
//        var rowscount = $("#smsUserGrid1").jqxGrid('getdatainformation').rowscount;
//        if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
//            var id = $("#smsUserGrid1").jqxGrid('getrowid', selectedrowindex);
//            $("#smsUserGrid1").jqxGrid('deleterow', id);
//        }
    });

    //팝업 종료버튼
    $('#pbtnSmsClose').click(function() {
        $('#pSmsWindow').jqxWindow('close');
    });

    //SMS 전송버튼
    $('#pbtnSms').click(function() {
        if($("#smsContent").val() == ""){
            alert("내용을 입력해주세요.");
            return false;
        }
        if($("#smsUserGrid1").jqxGrid('getdatainformation').rowscount == 0){
            alert("수신자를 등록해주세요.");
            return false;
        }
        if($("#sendNum1").val() == "" || $("#sendNum2").val() == "" || $("#sendNum3").val() == ""){
            alert("보내는 번호를 입력해주세요.");
            return false;
        }

        if(flag == 'Y'){
            alert("전송 내용은 최대 80 bytes 입니다.");
            return false;
        }
        //SMS 전송
        smsSend();
    });

    //수신자추가버튼 클릭.
    $('#btnPlus').click(function() {
        if($("#nameText").val() == ""){
            alert("이름을 입력해주세요.");
            return false;
        }
        if($("#mobleText1").val() == "" || $("#mobleText2").val() == "" || $("#mobleText3").val() == ""){
            alert("전화번호를 입력해주세요.");
            return false;
        }

        //중복체크
        var rowscount = $("#smsUserGrid1").jqxGrid('getdatainformation').rowscount;
        if(rowscount >0){
            for(var i=0; i<rowscount; i++){
                var data_row = $("#smsUserGrid1").jqxGrid('getcellvalue', i, 'moblPhnNo');
                var data_row2= $("#mobleText1").val()+"-"+$("#mobleText2").val()+"-"+$("#mobleText3").val();
                if(data_row == data_row2){
                    alert('수신자 목록에 이미 등록되어있습니다.');
                    return false;
                }
            }
        }

        var rows = new Array();
        var row = {};
        row["userName"] = $("#nameText").val();
        row["moblPhnNo"] = $("#mobleText1").val()+"-"+$("#mobleText2").val()+"-"+$("#mobleText3").val();
        rows.push(row);

        $("#smsUserGrid1").jqxGrid('addrow', null, rows);

        $("#nameText").val("");
        $("#mobleText1").val("");
        $("#mobleText2").val("");
        $("#mobleText3").val("");

    });

    //SMS 전송
    function smsSend(){
        // 리스트 생성
        var recevieList = new Array() ;
        var rowscount = $("#smsUserGrid1").jqxGrid('getdatainformation').rowscount;
        if(rowscount >0){
            for(var i=0; i<rowscount; i++){
                // 객체 생성
                var data = new Object() ;
                data.userName = $("#smsUserGrid1").jqxGrid('getcellvalue', i, 'userName');
                data.phone	  = $("#smsUserGrid1").jqxGrid('getcellvalue', i, 'moblPhnNo');
                recevieList.push(data);
            }
        }

        var message = "";
        //사고에서 호출.
        if(acType != ""){
            if(acType == "0"){
                acType = "이관승인";
            }else if(acType == "1"){
                acType = "사고접수";
            }else if(acType == "3"){
                acType = "위변조URL";
            }
            message = {
                sms : {
                    type: acType,
                    msg :$("#smsContent").val(),
                    sender : $("#sendNum1").val()+"-"+$("#sendNum2").val()+"-"+$("#sendNum3").val(),
                    recv : recevieList
                }
            };
        }else{
            message = {
                sms : {
                    msg :$("#smsContent").val(),
                    sender : $("#sendNum1").val()+"-"+$("#sendNum2").val()+"-"+$("#sendNum3").val(),
                    recv : recevieList
                }
            };
        }

        Server.post("/api/main/sms/addSmsMessage", {
            data: message,
            success: function (result) {
				
            }
        });

		alert("SMS 전송이 완료되었습니다.");
        
    }


    //receipt
    function funReceipt(){
        var recevieList = new Array() ;
        var rowscount = $("#smsUserGrid1").jqxGrid('getdatainformation').rowscount;
        if(rowscount >0){
            for(var i=0; i<rowscount; i++){
                // 객체 생성
                var data = new Object() ;
                if(typeof $("#smsUserGrid1").jqxGrid('getcellvalue', i, 'userId') !== "undefined"){
                    data.userId = $("#smsUserGrid1").jqxGrid('getcellvalue', i, 'userId');
                    recevieList.push(data);
                }
            }
        }

        //userid 중복제거.
        var resultArr =  new Array() ;
        for (var i = 0; i < recevieList.length; i++) {
            if (resultArr.length == 0) {
                resultArr.push(recevieList[i]);
            }else{
                var flg = true;
                for (var j = 0; j < resultArr.length; j++) {
                    if (JSON.stringify(resultArr[j])  == JSON.stringify(recevieList[i]) ) {
                        flg = false;
                        break;
                    }
                }
                if (flg) {
                    resultArr.push(recevieList[i]);
                }
            }
        }

        if(acType == "0"){
            acType = "이관승인";
        }else if(acType == "1"){
            acType = "사고접수";
        }
        var message  = {
            receipt : {
                msg : $("#smsContent").val(),
                msgType : acType,
                recv : resultArr
            }
        };

        eb.send("worker.receipt", message, function (aa, result) {
            if (result == null) {
                console.log("ERROR: response null");
            } else {
                $('#pSmsWindow').jqxWindow('close');
            }
        });
    }

    //바이트체크.
    $(function(){
        $('#smsContent').keyup(function(){
            bytesHandler(this);
        });
    });

    function bytesHandler(obj){
        var content = $(obj).val();
        var byteLen = content.byteLen();

        $('#byteSpan').text(byteLen);

        if(byteLen > 80){
            flag = 'Y'
            $("#byteSpan").css('color','red');
        }else{
            flag = 'N';
            $("#byteSpan").removeAttr('style');
        }
		/*if (content.length > 80){
		 $(obj).val(content.substring(0, 80));
		 }*/
    }

    function duplCheck($Grid){
        var selectedRowIndexes = HmGrid.getRowIdxes($Grid);

        //중복체크...
        var duplKeys = [];
        var rowscount = $("#smsUserGrid1").jqxGrid('getdatainformation').rowscount;

        if(rowscount >0){
            for(var i=0; i<selectedRowIndexes.length; i++){
                var data_row2=$Grid.jqxGrid('getcellvalue', selectedRowIndexes[i], 'moblPhnNo');
                for(var j=0; j<rowscount; j++){
                    var data_row =$("#smsUserGrid1").jqxGrid('getcellvalue', j, 'moblPhnNo');
                    if(data_row2==data_row){
                        duplKeys.push(selectedRowIndexes[i]);
                    }
                }
            }
        }

        var index;
        for(var i=0; i<duplKeys.length; i++){
            index = selectedRowIndexes.indexOf(duplKeys[i]);
            if(index > -1){
                selectedRowIndexes.splice(index, 1);
            }
        }
        if(selectedRowIndexes.length>0){
            for(var i=0; i< selectedRowIndexes.length; i++){
                var itemget = $Grid.jqxGrid('getrowdata', selectedRowIndexes[i]);
                $("#smsUserGrid1").jqxGrid('addrow', null, itemget);
            }
        }

        HmGrid.updateBoundData($Grid);
    }

    $('#btnSearch_smsSend').click(function() {
        HmGrid.updateBoundData($smsUserGrid3, ctxPath + '/main/sys/custUserMgmt/getSmsOfUserList.do');
    });

</script>

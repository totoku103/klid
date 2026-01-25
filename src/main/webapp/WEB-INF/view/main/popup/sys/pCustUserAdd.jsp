<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="tableBorder">
	<table>
        <tr class="pop_grid ">
            <td class="pop_gridSub">그룹<span style="color: red;">*</span></td>
            <td>
                <div id="ddbPntSInstCd_userAdd" style="margin-left: 3px;">
                    <div id="pntSInstGrid_userAdd" style="border: none; display: none"></div>
                </div>
            </td>
        </tr>
		<tr class="pop_grid ">
			<td class="pop_gridSub">이름<span style="color: red;">*</span></td>
			<td><input id="custNm" type="text" class="pop_input" maxlength="50"/></td>
		</tr>
		<tr class="pop_grid ">
			<td class="pop_gridSub">전화번호<span style="color: red;">*</span></td>
			<td  style="text-align:initial;">
				<div id="moblPhnNo1" class="pop_inputWrite4 mobile" style="float: left; margin-right: 4px;"></div>
				-
				<input type="text"  name="moblPhnNo2" id="moblPhnNo2"  class="pop_inputWrite4" style="width:30%;" maxlength="4"  onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
				-
				<input type="text"  name="moblPhnNo3" id="moblPhnNo3"  class="pop_inputWrite4" style="width: 30%;" maxlength="4"  onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
			</td>
		</tr>
		<tr class="pop_grid ">
			<td class="pop_gridSub">이메일<span style="color: red;">*</span></td>
			<td>
				<div style="float: left;">
					<input type="text" name="emailAddr1" id="emailAddr1"  class="pop_inputWrite4" style="width: 30%;">
					@
					<input type="text" name="emailAddr2" id="emailAddr2"  class="pop_inputWrite4" style="width: 50%;">
				</div>
				<div id="autoEmail" class="pop_inputWrite4"></div>
			</td>
		</tr>
	</table>
</div>
<div style="text-align:center; margin-top:10px;">
	<button id="pbtnAdd" type="button" class="p_btnPlus"></button>
	<button id="pbtnClose" type="button" class="p_btnClose"></button>
</div>

<script>
    var listData;
    function pwindow_init(data) {
        listData = data;
        initDesign();
    }
    function initDesign() {
        $('#ddbPntSInstCd_userAdd').jqxDropDownButton({ width: 200, height: 22 })
            /*.on('open', function(event) {
                $('#pntSInstGrid_userAdd').css('display', 'block');

            });*/
        var initContent = '<div style="position: relative; margin-left: 3px; margin-top: 2px">선택해 주세요</div>';
        $('#ddbPntSInstCd_userAdd').jqxDropDownButton('setContent', initContent);

        HmGrid.create($('#pntSInstGrid_userAdd'), {
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
                            var dept = $('#pntSInstGrid_userAdd').jqxGrid('getcellvalue', row, "groupDepth");
                            var dpthBlank = '';
                            if(dept != 1){
                                for(var i=0; i < dept; i++){
                                    dpthBlank = '&nbsp;' + dpthBlank;
                                }
                            }
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-left-align'>" + dpthBlank+value +"</div>";
                        }
                    },
                    { text: 'LEVEL', datafield: 'groupDepth', width: 120 , sortable: false},
                ],
            width: 300, height: 200
        });
        $('#pntSInstGrid_userAdd').on('rowselect', function(event) {
            var rowdata = $(this).jqxGrid('getrowdata', event.args.rowindex);
            if(rowdata!=null){
                var content = '<div style="position: relative; margin-left: 3px; margin-top: 2px">' + rowdata.grpName + '</div>';
                $('#ddbPntSInstCd_userAdd').jqxDropDownButton('setContent', content);
                $('#ddbPntSInstCd_userAdd').jqxDropDownButton('close');
            }
        }).on('bindingcomplete', function(event) {
            $('#pntSInstGrid_userAdd').css('display', 'block');
        })


        $('.mobile').jqxDropDownList({ source: [{label: '010', value: '010'}, {label: '011', value: '011'}, {label: '016', value: '016'}, {label: '017', value: '017'}, {label: '018', value: '018'}, {label: '019', value: '019'}],
            displayMember: 'label', valueMember: 'value', width: 50, height: 19, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true });

        $('#autoEmail').jqxDropDownList({ source: [
            {label: '직접입력', value: 'self'},
            {label: '네이버', value: 'naver.com'},
            {label: '다음', value: 'daum.net'},
            {label: '구글', value: 'goole.com'}

        ],displayMember: 'label', valueMember: 'value', width: '90%', height: 19, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true })
            .on('change', function(event) {
                var value = event.args.item.value;
                if(value == 'self'){
                    $("#emailAddr2").val(null);
                    $("#emailAddr2").prop("readonly",false);
                    $('#emailAddr2').css('background-color' , '#FFFFFF');
                }else{
                    $("#emailAddr2").val(value);
                    $("#emailAddr2").prop("readonly",true);
                    $('#emailAddr2').css('background-color' , '#DEDEDE');
                }
            });
    }
    $('#pbtnClose').click(function() {
        $('#pwindow').jqxWindow('close');
    });
    $('#pbtnAdd').click(function() {
        var selected_idx = $('#pntSInstGrid_userAdd').jqxGrid('getselectedrowindex');
        if(selected_idx == -1){
            alert('그룹을 선택해주세요.');
            return
        }
        var rowData = $('#pntSInstGrid_userAdd').jqxGrid('getrowdata', selected_idx);
        var obj = $('#custNm');
        if($.isBlank(obj.val())) {
            alert('이름을 입력해주세요.');
            obj.focus();
            return;
        }
        obj = $('#moblPhnNo2');
        if($.isBlank(obj.val())) {
            alert('전화번호를 입력해주세요.');
            obj.focus();
            return;
        }
        obj = $('#moblPhnNo3');
        if($.isBlank(obj.val())) {
            alert('전화번호를 입력해주세요.');
            obj.focus();
            return;
        }
        obj = $('#emailAddr1');
        if($.isBlank(obj.val())) {
            alert('이메일을 입력해주세요.');
            obj.focus();
            return;
        }
        obj = $('#emailAddr2');
        if($.isBlank(obj.val())) {
            alert('이메일을 입력해주세요.');
            obj.focus();
            return;
        }

        var moblPhnNo = $("#moblPhnNo1").val() + '-' + $("#moblPhnNo2").val() + '-' + $("#moblPhnNo3").val();

        var emailAddr = $("#emailAddr1").val() + '@' + $("#emailAddr2").val();

        if(!moblPhnNo.isMobile('-')){
            alert('전화번호 형식이 올바르지 않습니다.');
            return;
        }
        if(!emailAddr.isEmail()){
            alert('이메일 형식이 올바르지 않습니다.');
            return;
        }

        var existVal = false;

        listData.custUserList.forEach(function (value, index, array1) {
                if(value.custCellNo==moblPhnNo){
                    alert('이미 등록된 번호입니다.');
                    existVal = true;
                    return;
                }
                if(value.custMailAddr==emailAddr){
                    alert('이미 등록된 이메일입니다.');
                    existVal = true;
                    return;
                }

            }
        )

        var params = {
            userId : $("#sUserId").val(),
            custNm : $('#custNm').val(),
            custCellNo: moblPhnNo,
            custMailAddr: emailAddr,
            smsGroupSeq: rowData.grpNo,
			test : listData.userId
        }

        if(!existVal){
            Server.post('/api/main/sys/addCustUser', {
                data: params,
                success: function (result) {
                    alert("추가되었습니다.");
                    $('#pwindow').jqxWindow('close');
                    HmGrid.updateBoundData($custUsergGrid);
                }
            });
        }
    });

</script>
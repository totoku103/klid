<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<form id="pForm" method="post" enctype="multipart/form-data">
	<input type="hidden" id="p_nationCd">
    <div class="tableBorder">
        <div class="searchBox">
            <div>
                <div id="p_cbPeriodPop" style="margin-left:0; margin-right:10px; float: left; " class="pop_combo1"></div>
                <div id="p_date1Pop" style="float: left" class="pop_combo1"></div>
                <label style="float: left; padding-left:5px; padding-right:5px; padding-top:2px;">~</label>
                <div id="p_date2Pop" style="float: left" class="pop_combo1"></div>
            </div>
            <%--<div>
                <label style="float: left">기준시간 </label>
                <div id="p_time" style="margin-left:0; margin-right:10px; float: left; " class="pop_combo1"></div>
            </div>--%>
            <div class="searchBtn">
                <button id="p_searchPop" type="button" class="p_btn"></button>
            </div>
        </div>
		<div style="margin-top: 10px;">
			<div id="pAccDuplGrid"></div>
		</div>
    </div>
    <div style="text-align: center; margin-top: 10px;">
		<button id="pbtnClosePop" type="button" class="p_btnClose"></button>
    </div>
</form>
<script>
    function pAccDuplWindow_init(ipList) {
        var $cbPeriod  = $('#p_cbPeriodPop');
        //var $time = $('#p_time');

        Master.createPeriodCondition4($cbPeriod, $('#p_date1Pop'), $('#p_date2Pop'));
        $cbPeriod.jqxDropDownList({ selectedIndex: 2});
        $('#p_date1Pop').jqxDateTimeInput({formatString: 'yyyy-MM-dd'});
        $('#p_date2Pop').jqxDateTimeInput({formatString: 'yyyy-MM-dd'});

        $time.jqxDropDownList({ width: 50, height: 21, theme: jqxTheme, autoDropDownHeight: true,
            displayMember: 'label', valueMember: 'value', selectedIndex:15,
            source: [
                { label: '00', value: 0 },
                { label: '01', value: 1 },
                { label: '02', value: 2 },
                { label: '03', value: 3 },
                { label: '04', value: 4 },
                { label: '05', value: 5 },
                { label: '06', value: 6 },
                { label: '07', value: 7 },
                { label: '08', value: 8 },
                { label: '09', value: 9 },
                { label: '10', value: 10 },
                { label: '11', value: 11 },
                { label: '12', value: 12 },
                { label: '13', value: 13 },
                { label: '14', value: 14 },
                { label: '15', value: 15 },
                { label: '16', value: 16 },
                { label: '17', value: 17 },
                { label: '18', value: 18 },
                { label: '19', value: 19 },
                { label: '20', value: 20 },
                { label: '21', value: 21 },
                { label: '22', value: 22 },
                { label: '23', value: 23 }
            ]
        });

        var imagerenderer = function (row, datafield, value) {
            var code = value;
            if(value == ''){
                code = 0;
            };
            var cell = "<div style='margin-top: 2px' class='jqx-center-align'>";
            cell += '<img alt="processIcon" height="18" width="52" src="../../img/codeImg/code_' + code + '.png"/>';
            cell += "</div>";
            return cell;
        };

        HmGrid.create($("#pAccDuplGrid"), {
			height: 360,
			source: new $.jqx.dataAdapter(
					{
						datatype: 'json',
						url: ctxPath + '/main/acc/accidentApply/getAccDuplList.do'
					}, {
                        formatData: function (data) {
                           $.extend(data, getCommParams(ipList));
                            $.extend(data, {});
                            return data;
                        }
					}
			),
            pageable : false,
			columns:
			[
                {text: '접수날짜', datafield : 'inciAcpnDt', cellsalign : 'center', width : '120px;'},
                {text: '접수번호', datafield: 'inciNo', width: '100px;', cellsalign: 'center', editable: false,columnsreorder: true},
                {text: '신고기관', datafield: 'dclInstName', width: '90px;', cellsalign: 'center', editable: false,columnsreorder: true},
                {text: '접수기관', datafield: 'dmgInstName', width: '60px;', cellsalign: 'center', editable: false,columnsreorder: true},
                {text: '제목(탐지명)',    datafield: 'inciTtlDtt', minwidth: '100px;', cellsalign: 'left', editable: false,columnsreorder: true,
                    cellsrenderer: function(row, column, value, rowData){
                        var data = $accidentGrid.jqxGrid('getrowdata', row);
                        var str = value.split("[");
                        if(str.length>2)
                            value = data.inciTtl;

                        return '<div class="jqx-grid-cell-left-align" style="margin-top: 2.5px;">'+value+'</div>';
                    }
                },
                {text: '처리상태', datafield: '', width: '80px', cellsalign: 'center', editable: false,columnsreorder: true,
                    //cellsrenderer: imagerenderer
                    cellsrenderer: function(row, column, value, rowData){
                        var data = $accidentGrid.jqxGrid('getrowdata', row);
                        var _sAuthMain = $("#sAuthMain").val();
                        var code = '';
                        if(data != null){
                            if(_sAuthMain == 'AUTH_MAIN_2'){
                                code = data.inciPrcsStat;
                            }else if(_sAuthMain == 'AUTH_MAIN_3'){
                                code= data.transInciPrcsStat;
                            }else if(_sAuthMain == 'AUTH_MAIN_4'){
                                code= data.transSidoPrcsStat;
                            }else{
                                code = data.inciPrcsStat;
                            }

                        }

                        //var code = value;
                        if(code == ''){
                            code = 0;
                        };
                        var cell = "<div style='margin-top: 2px' class='jqx-center-align'>";
                        cell += '<img alt="processIcon" height="18" width="52" src="../../img/codeImg/code_' + code + '.png"/>';
                        cell += "</div>";
                        return cell;
                    }
                },
                {text: '사고유형', datafield: 'accdTypName', width: '80px;', cellsalign: 'center', editable: false,columnsreorder: true}

		    ]
		});

    }

    function  getCommParams  (params) {
        var startDt = new Date($('#p_date1Pop').val());
        var endDt=new Date($('#p_date2Pop').val());

        startDt =  $.format.date(startDt, "yyyyMMdd");
        endDt =  $.format.date(endDt, "yyyyMMdd");

        var sYear = $.format.date(new Date($date2.val()),"yyyyMMdd");

        var params = {
            ipList : params,
            startDt : startDt,
            endDt: endDt,
            sInstCd   :  $("#sInstCd").val(),
            sAuthMain :  $("#sAuthMain").val(),
            ipCheckType : ipCheckType //중복검사 타입 피해인지 공격인지
            //srchType : $("#srchType").val()
        }

        if(ipCheckType == 'dcl'){
            params.srchType = $("#srchType").val();
        }else{
            params.srchType = $("#srchTypeAtt").val();
        }
        return params ;
    }

    $('#p_searchPop').click(function() {
        HmGrid.updateBoundData($("#pAccDuplGrid"));
    });

    $('#pbtnClosePop').click(function() {
        $('#pAccDuplWindow').jqxWindow('close');
    });

</script>.


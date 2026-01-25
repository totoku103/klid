<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<body>
<form id="p_form2">
	<div class="searchBox">
		<div>
			<label style="float: left">국가명 : </label>
			<input type="text" id="sNationNm">
		</div>
		<div class="searchBtn">
			<button id="btnNationSearch" type="button" class="p_btn" ></button>
		</div>
	</div>
	<div id="nationIPGrid"></div>
</form>
</body>
<script type="text/javascript">
    var $nationIPGrid, isAdmin = false;
	var nationType ;
    $nationIPGrid = $('#nationIPGrid');
    function pNationWindow_init(params) {
        nationType = params.type ; //국가검색이 피해 인지 공격인지

        var imagerenderer = function (row, datafield, value) {
            var cell = "<div style='margin-top: 2px' class='jqx-center-align'>";
            cell += '<img height="13" width="20" src="../../img/symbol/' + value + '.gif"/>';
            cell += "</div>";
            return cell;
        }
        HmGrid.create($nationIPGrid, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    //url: ctxPath + '/main/env/nationIPMgmt/getNationMgmtList.do',
                    datafields: [
                        { name: 'nationCd', type: 'number' },
                        { name: 'nationNm', type: 'string' },
                        { name: 'nationNmCnt', type: 'string' },
                        { name: 'domain', type: 'string' },
                        { name: 'continental', type: 'string' },
                        { name: 'nationCnt', type: 'number' },
                        { name: 'regDt', type: 'string' }
                    ]
                }, {
                    formatData : function(data) {
                        try{
                            $.extend(data, {
                                sNationNm : $("#sNationNm").val()
                            });
                        }catch(err){}
                        return data;
                    }
                }
            ),
            editable: false,
            pageable: false,
            columns:
                [
                    //{ text : '번호', datafield : 'nationCd', width : 120,  cellsalign: 'center' ,hidden: true},
                    { text : ' ', datafield : 'domain', width: 40,  cellsalign: 'center', cellsrenderer: imagerenderer },
                    { text : '국가명', datafield : 'nationNmCnt', width: 'auto'},
                    { text : '대륙명', datafield : 'continental', width : 150, cellsalign: 'center'},
                    { text : '', datafield : 'nationCd', width : '70', cellsalign: 'center',
                        cellsrenderer: function(row, column, value, rowData){
                            return '<button id="btnNationAdd" type="button" class="p_btnPlus"></button>';
                        }
                    },
                ]
        });
    }


    $nationIPGrid.on('click', '#btnNationAdd', function() {
        var rowIdx = HmGrid.getRowIdx($nationIPGrid, '데이터를 선택해주세요.');
        var rowdata = HmGrid.getRowData($nationIPGrid, rowIdx);

        if(nationType == 'pDmgNation'){
            $("#dmgNatnCdDiv").text(rowdata.nationNm);
            $("#dmgNatnCd").val(rowdata.nationCd);
		}else{
            $("#attNatnCdDiv").text(rowdata.nationNm);
            $("#attNatnCd").val(rowdata.nationCd);
		}

        $('#pNationWindow').jqxWindow('close');
    });

    $('button').bind('click', function(event) {
		if(event.currentTarget.id == 'btnNationSearch'){
            HmGrid.updateBoundData($nationIPGrid, ctxPath + '/main/env/nationIPMgmt/getNationMgmtList.do');
		}
    });

    $('.searchBox').keypress(function(e) {
        if (e.keyCode == 13) {
            HmGrid.updateBoundData($nationIPGrid, ctxPath + '/main/env/nationIPMgmt/getNationMgmtList.do');
            return false;
		}

    });

</script>
</html>
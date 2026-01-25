<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<form id="pForm" method="post" enctype="multipart/form-data">
        <div style="margin-top: 10px;">
			<div id="pThreatGrid"></div>
		</div>
    <div style="text-align: center; margin-top: 10px;">
		<button id="pbtnClose" type="button" class="p_btnClose"></button>
    </div>
</form>
<script>
    var totalCnt=0;

    function pThreatHistWindow_init(ipList) {
        HmGrid.create($('#pThreatGrid'), {
            source : new $.jqx.dataAdapter(
                {
                    datatype : 'json',
                    url: $('#ctxPath').val() + '/main/sys/getThreatHist.do',
                    beforeprocessing: function(data) {
                        if(data != null){
                            totalCnt = data.resultData.length;
                        }
                    },
                }
            ),
            editable: true,
            pageable : true,
            pagermode: 'default',
            height : 300,
            editmode: 'selectedrow',
            columns: [
                //PAST_THREAT, NOW_THREAT, INST_CD, TO_DATE(MOD_DT,'YYYY-MM-DD HH24:MI:SS') AS MOD_DT, THREAT_CONT
                { text: 'No', width: '10%', datafield : 'num',pinned: true, editable: false , sortable: false, cellsalign: 'center', filterable: false,
                    cellsrenderer: function(row, column, value, rowData) {
                        return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (totalCnt - row )*1 +"</div>";
                    }
                },
                {text: '이전상태', datafield : 'pastNm', cellsalign : 'center', width : '15%'},
                {text: '변경상태', datafield : 'nowNm', cellsalign : 'center', width : '15%'},
                {text: '수정일자', datafield : 'modDt', cellsalign : 'center', width : '20%'},
                {text: '수정내용', datafield : 'threatCont', cellsalign : 'center', width : '40%'},
            ]
        }, 0);
    }

    $('#pbtnClose').click(function() {
        $('#pThreatHistWindow').jqxWindow('close');
    });
</script>
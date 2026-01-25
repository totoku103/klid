<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="threatSet">
</div>
<div>
	<textarea id="threatCont" style="width: 94.5%; height: 150px; margin:5px;  border: 1px solid #cccccc; resize:none;" placeholder="이력을 남겨주세요" ></textarea>
</div>
<div style="text-align:center; margin-top:10px;">
	<button id="pThreatSetEdit" type="button" class="p_btnChange"></button>
	<button id="pThreatClose" type="button" class="p_btnClose"></button>
	<button id="pThreatHistory" type="button" class="p_btnHistory"></button>
</div>

<script>
    function pwindow_init(data) {

        var is_threat=0;
        var prev_data = data;
        var prev_now;

        //위협등급
        var threatLevels = new $.jqx.dataAdapter(
            { datatype: 'json', url: ctxPath + '/main/sys/getThreatLevel.do' }
        );
        $('#threatSet').jqxDropDownList({ source: threatLevels, displayMember: 'levelNm', valueMember: 'levelCd', width: '99%', height: 20, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true });

        Server.get('/api/main/sys/getThreatNow', {
                    data: {instCd: data.instCd},
                    success: function (data) {
                if(data.length==0){
                    prev_now = 1;
                    $("#threatSet").jqxDropDownList('val', 1);
				}else{
                    is_threat=1;
                    prev_now =  data[0].nowThreat;
                    $("#threatSet").jqxDropDownList('val', data[0].nowThreat);
				}
            }
		});

        $('#pThreatSetEdit').click(function() {
            var params = {
                isThreat:is_threat,
                instCd: prev_data.instCd,
				nowThreat:$('#threatSet').val(),
				pastThreat:prev_now,
                threatCont:$('#threatCont').val()
			}

            Server.post('/api/main/sys/editThreat', {
                data: params,
                success: function (data) {
                    $('#alarmCircle').attr('class','Circle'+$('#threatSet').val());
                    alert("변경되었습니다.");
                    $('#pwindow').jqxWindow('close');

                }
            });
        });
        $('#pThreatClose').click(function() {
            $('#pwindow').jqxWindow('close');
        });

        $('#pThreatHistory').click(function() {
            var pwin = $('#pThreatHistWindow');
            try {
                if(pwin.length == 0) {
                    pwin = $('<div id="pThreatHistWindow" style="position: absolute;"></div>')
                    pwin.append($('<div></div>'));
                    pwin.append($('<div></div>'));
                    $('body').append(pwin);
                }
                HmWindow.create(pwin);
            } catch(e) {}

            $.get(ctxPath + '/main/popup/sys/pThreatHistList.do',
                function(result) {
                    HmWindow.open($('#pThreatHistWindow'), '예.경보 발령 이력', result, 600, 400,'pThreatHistWindow_init',{instCd:$('#sInstCd').val()});
                }
            );
        });

    }

</script>
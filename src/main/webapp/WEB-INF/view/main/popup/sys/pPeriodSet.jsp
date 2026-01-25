<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<input type="text" id="period1Set" class="pop_inputWrite4" style="width: 80px;" maxlength="4" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
<input type="text" id="period2Set" class="pop_inputWrite4" style="width: 80px;" maxlength="4" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
<input type="text" id="period3Set" class="pop_inputWrite4" style="width: 80px;" maxlength="4" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
<div style="text-align:center; margin-top:10px;">
	<button id="pPeriodSetEdit" type="button" class="p_btnChange"></button>
	<button id="pPeriodClose" type="button" class="p_btnClose"></button>
</div>

<script>
    function pwindow_init(data) {

        var is_period=0;
        var prev_data = data;

        Server.get('/api/main/sys/getPeriodNow', {
                    data: {instCd: data.instCd},
                    success: function (data) {
                if(data.length==0){
                    $('#period1Set').val(10);
                    $('#period2Set').val(20);
                    $('#period3Set').val(30);
				}else{
                    is_period=1;
                    $('#period1Set').val(data[0].period1);
                    $('#period2Set').val(data[0].period2);
                    $('#period3Set').val(data[0].period3);
				}
            }
		});

        $('#pPeriodSetEdit').click(function() {
            var checkYn = 'N';
            if($('#period1Set').val() > $('#period2Set').val()) {
                checkYn = 'Y';
            }

            if($('#period1Set').val() > $('#period3Set').val()) {
                checkYn = 'Y';
            }

            if($('#period2Set').val() > $('#period3Set').val()) {
                checkYn = 'Y';
            }

            if(checkYn == 'Y'){
                alert("각 항목 값은 이전 값보다 작을수 없습니다.");
                return
			}



            var params = {
                isPeriod:is_period,
                instCd: prev_data.instCd,
				period1:$('#period1Set').val(),
                period2:$('#period2Set').val(),
                period3:$('#period3Set').val()
			}

            Server.post('/api/main/sys/editPeriod', {
                data: params,
                success: function (data) {
                    Main.getPeriod();
                    alert("변경되었습니다.");
                    $('#pwindow').jqxWindow('close');
                }
            });
        });
        $('#pPeriodClose').click(function() {
            $('#pwindow').jqxWindow('close');
        });

    }

</script>
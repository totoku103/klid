<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="p_contentsP10 " style="background-color: aliceblue; border-radius: 10px">
	<div class="p_contentsM10 borderLine" >
		<table id="divAppend">
		</table>
	</div>
</div>

<div style="text-align:center; margin-top:12px;">
	<button id="pClose" type="button" class="p_btnClose"></button>
</div>

<script>
    function pwindow_init(data) {
        var grid = data.exceptlistGrid;

        var listgrid = data.listGrid;

        var totalgrid = data.totalGrid;

        totalgrid.forEach(function (data, index) {
            var totalHtml = '';
            totalHtml += '■ 총 '+data.totCnt+'건 처리 (웜바이러스 '+data.wormCnt+'건)<br><br>' +
			'o 국가사이버안전센터 : '+data.nisCnt+'건<br><br>';

        	$('#divAppend').append(totalHtml);
        });
        listgrid.sort(function (a,b) {
            var inciDttNm = a.inciDttNm;
            if(inciDttNm==null){
                var split = a.inciTtl.split("[");
                inciDttNm = split[1].substring(0,split[1].length-1);
            }
            var reInciDttNm = b.inciDttNm;
            if(reInciDttNm==null){
                var split = b.inciTtl.split("[");
                reInciDttNm = split[1].substring(0,split[1].length-1);
            }
			return inciDttNm-reInciDttNm;
        });

        var array =[];
        listgrid.forEach(function (data, index) {
            var listHtml = '';
			var inciDttNm = data.inciDttNm;
			if(inciDttNm==null){
			    var split = data.inciTtl.split("[");
                inciDttNm = split[1].substring(0,split[1].length-1);
			}
			var cnt=0;
            listgrid.forEach(function (redata, reindex) {
                var reInciDttNm = redata.inciDttNm;
                if(reInciDttNm==null){
                    var split = redata.inciTtl.split("[");
                    reInciDttNm = split[1].substring(0,split[1].length-1);
                }
                if(inciDttNm==reInciDttNm){
                    cnt++;
                }
            });

            array.push({inciDttNm:inciDttNm, cnt:cnt,dmgInstNm:data.dmgInstNm});
			listHtml += '- '+inciDttNm + '('+cnt+') : '+ data.dmgInstNm+'(1)<br>';

            $('#divAppend').append(listHtml);
        });
//        console.log(array)

        grid.forEach(function (data, index) {
            var splitDt = data.inciAcpnDt.split(' ');
            var keywordHtml = '';
            keywordHtml += '<tr><td><strong>시간</strong></td><td colspan=2>'+splitDt[0].substring(0,4)+'년 '+splitDt[0].substring(5,7)+'월 '+splitDt[0].substring(8,10)+'일 '+splitDt[1].substring(0,5)+'</td><td><strong>유형</strong></td><td colspan=2>'+data.accdTypCdNm+'</td></tr>';
            keywordHtml += '<tr><td><strong>공격IP<br>(공격,기관)</strong></td><td>'+data.ipAddr+'</td><td><strong>경유IP<br>(국적,기관)</strong></td><td></td><td><strong>피해IP<br>(국적,기관)</strong></td><td>'+data.instNm+'</td></tr>';
            keywordHtml += '<tr><td><strong>조사내용</strong></td><td>o 사고등록 및 이관실시 <br>o 해당 취약점 제거 및 웹서버 취약점 점검요청</td></tr>';

            $('#divAppend').append(keywordHtml);
        });

		$('#pClose').click(function() {
		 	$('#pwindow').jqxWindow('close');
		 });

    }

</script>
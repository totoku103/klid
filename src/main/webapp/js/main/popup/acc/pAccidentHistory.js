function pHistoryWindow_init(rows) {
    $.ajax({
        type: "post",
        url: $('#ctxPath').val() + '/api/main/acc/accidentApply/getAccidentHistoryList',
        data: {
            inciNo: rows.inciNo,
            histNo: rows.histNo
        },
        dataType: "json",
        success: function (jsonData) {
            $("#historyTitle").val(jsonData.resultData[0].ttl);
            $("#historyCont").val(jsonData.resultData[0].hstyCont);
        }
    });

}



$('#pHistory_close').click(function() {
	$('#pHistoryWindow').jqxWindow('close');
});


<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="tableBorder">
	<table>
		<tr class="pop_grid ">
			<td class="pop_gridSub">코드그룹</td>
			<td><input id="codeTitle" type="text" readonly="readonly" class="pop_input" style="border: none;" maxlength="50"/></td>
		</tr>
	    <tr class="pop_grid ">
	        <td class="pop_gridSub">코드명(*)</td>
			<td><input id="codeName" name="codeName" type="text" class="pop_input" maxlength="50"/></td>
	    </tr>
		<tr class="pop_grid ">
			<td class="pop_gridSub">코드값(*)</td>
			<td><input id="comCode2" name="comCode2" type="text" class="pop_input" maxlength="50"/></td>
		</tr>
		<%--<tr class="pop_grid ">
			<td class="pop_gridSub">코드값2</td>
			<td><input id="comCode3" name="comCode3" type="text" class="pop_input" maxlength="50"/></td>
		</tr>--%>
		<tr class="pop_grid ">
			<td class="pop_gridSub">설명</td>
			<td><input id="codeCont" name="codeCont" type="text" class="pop_input" maxlength="50"/></td>
		</tr>
		<tr class="pop_grid ">
			<td class="pop_gridSub">사용여부</td>
			<td>
				<div id="useYn" name="useYn" class="pop_combo1"></div>
			</td>
		</tr>
		<tr class="pop_grid ">
			<td class="pop_gridSub">설문코드여부</td>
			<td>
				<div id="surveyYn"></div>
			</td>
		</tr>
		<tr id="surveyExamDiv" class="pop_grid" style="display: none;">
			<td class="pop_gridSub">문항유형</td>
			<td>
				<div id="surveyExamType"></div>
			</td>
		</tr>
	</table>
</div>
<div id="codeFilePos" style="display: none">
	<div id="codeFileUpload"/>
</div>
<div style="text-align:center; margin-top:10px;">
	<button id="pbtnAdd" type="button" class="p_btnPlus"></button>
	<button id="pbtnClose" type="button" class="p_btnClose"></button>
</div>

<script>
    var _file = null;

    function pwindow_init(data) {

        if(comCode1==3002){
            $('#codeFilePos').css('display','block');
        }

        $('#codeFileUpload').jqxFileUpload({ width : '100%', fileInputName : 'codefileinput'});
        $('#codeFileUploadBrowseButton').val("처리방안파일");

        $('#codeFileUpload').on('select', function (event) {
            var fileName = event.args.file;
            _file = fileName
            $('#codeFileUploadUploadButton').css('display','none');
            $('#codeFileUploadCancelButton').css('display','none');
            $('.jqx-file-upload-buttons-container').css('display', 'none');
        })
			.on('remove', function (event) {
			    _file=null;
			})
            .on('uploadEnd', function (event) {

            });


        $('#surveyYn').jqxDropDownList({ width: 153, height: 21, theme: jqxTheme, autoDropDownHeight: true,
            displayMember: 'label', valueMember: 'value', selectedIndex: 0,
            source: [
                { label: '아니오', value: 'N' },
                { label: '예', value: 'Y' }
            ]
        }).on('change', function(event) {
            if($("#surveyYn").val() == 'Y'){
                $("#surveyExamDiv").show();

                $('#surveyExamType').jqxDropDownList({ width: 153, height: 21, theme: jqxTheme, autoDropDownHeight: true,
                    displayMember: 'label', valueMember: 'value', selectedIndex: 0,
                    source: [
                        { label: '선택형', value: 'choose' },
                        { label: '입력형', value: 'text' }
                    ]
                })
            }else{
                $("#surveyExamDiv").hide();
            }
        });
        $('#useYn').jqxDropDownList({ width: 153, height: 21, theme: jqxTheme, autoDropDownHeight: true,
            displayMember: 'label', valueMember: 'value', selectedIndex: 0,
            source: [
                { label: '예', value: 'Y' },
                { label: '아니오', value: 'N' }
            ]
        });

        $('#codeTitle').val(codeName); //대분류 코드값 세팅

        $('#pbtnClose').click(function() {
            $('#pwindow').jqxWindow('close');
        });
        $('#pbtnAdd').click(function() {
            var obj = $('#codeName');
            if($.isBlank(obj.val())) {
                alert('코드명을 입력해주세요.');
                obj.focus();
                return;
            }

            var comCode2 = $('#comCode2');
            if($.isBlank(comCode2.val())) {
                alert('코드값을 입력해주세요.');
                obj.focus();
                return;
            }

            if(comCode2.val().length > 8) {
                alert('8자리 이하로 입력해주세요.');
                obj.focus();
                return;
            }

            Server.get('/api/main/sys/getCodeDuplCnt', {
                data: {
                    comCode1 : comCode1,
                    codeName: $('#codeName').val(),
                    codeLvl: 2
                },
                success: function (data) {
                    if(data > 0){
                        alert("코드명이 존재합니다.")
                        return false;
                    }

                    var addData = {
                        codeName: $('#codeName').val(),
                        codeLvl : 2,
                        comCode1 : comCode1,   //좌측 선택 부모값
                        comCode2 : $('#comCode2').val(),
                        comCode3 : $('#comCode3').val(),
                        useYn    : $('#useYn').val(),
                        codeCont : $('#codeCont').val()
                    };
                    if($("#surveyYn").val() == 'Y'){
                        addData.flag1 = 'survey';
                        addData.flag2 = $("#surveyExamType").val();

                    }
                    //addCodeLv1Result(addData);
                    save(addData,2);

                    /*$('#codeFileUpload').jqxFileUpload({
                        uploadUrl : ctxPath + '/file/codeUpload.do?code2='+ $('#comCode2').val()
                    });
                    try{
                        $('#codeFileUpload').jqxFileUpload('uploadAll');
                    }catch (e) {
                        console.log(e);
                    }*/
                }
            });

        });
    }


	
</script>